'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async getRecommendations(ctx) {
        const { user_id } = ctx.params;
        //Получаем всех пользователей и их жанровые предпочтения, а также заказы (содержащие информацию о книгах).
        const allUsers = await strapi.db.query('plugin::users-permissions.user').findMany({
            populate: { 'genre_preferences': true, 'orders': { populate: { 'bookData': { populate:{ 'orders': true}} } } }
        });

        //Получаем текущего пользователя, его жанровые предпочтения и заказы.
        const user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: { id: user_id },
            populate: { 'genre_preferences': true, 'orders': { populate: { 'bookData': {
                populate: { 'orders': true},
            } } } }
        });

        if (!user) {
            return ctx.throw(404, 'User not found');
        }

        //Функция для вычисления схожести предпочтений по жанрам
        //Для каждого пользователя вычисляем схожесть его жанровых предпочтений с предпочтениями текущего пользователя. Для этого используем коэффициент Жаккара (количество общих жанров / произведение размеров множеств жанров).
        
        const calculateGenreSimilarity = (userA, userB) => {
            const genresA = new Set(userA.genre_preferences.map(pref => pref.genres));
            const genresB = new Set(userB.genre_preferences.map(pref => pref.genres));

            console.log('genresA', genresA)
            console.log('genresB', genresB)

            const commonGenres = Array.from(genresA).filter(genre => {
                return genresB.has(genre);
            });
            
            console.log('commonGenres', commonGenres)
            console.log('res >>>', commonGenres.length / Math.sqrt(genresA.size * genresB.size))
            //Вычисляем количество общих жанров и делим его на квадратный корень из произведения размеров множеств жанров, чтобы нормализовать значение.
            return commonGenres.length / Math.sqrt(genresA.size * genresB.size);
        };

        //Если коэффициент схожести больше или равен 0 (в данном примере это условие всегда истинно), пользователь считается "похожим".
        // Определяем пользователей с похожими предпочтениями
        const similarUsers = allUsers.filter(otherUser => {
            if (otherUser.id === user.id) return false; // Исключаем самого пользователя
            const similarity = calculateGenreSimilarity(user, otherUser);
            console.log('similarity', similarity);
            return similarity > 0.4; // Порог схожести
        });
        
        //Собираем книги, которые заказывали похожие пользователи, но которые еще не заказывал текущий пользователь.
        //Используем множества (Set) для предотвращения дублирования книг в рекомендациях.
        const recommendedBooks = new Set();
        console.log('similarUser', similarUsers);
        similarUsers.forEach(similarUser => {
            if (!similarUser.orders.length) return;

            similarUser?.orders?.forEach(order => {
                if (!order.bookData.length) return;

                order?.bookData?.forEach(book => {
                    const state = user.orders.some(userOrder => userOrder.bookData.some(userBook => userBook.bookId === book.bookId));

                    if (!state) {
                        recommendedBooks.add(book.bookId);
                        console.log('Added book:', book.bookId);
                    }
                });
            });
        });
        
        if(!recommendedBooks) return [];
        
        const recommendations = Array.from(recommendedBooks);
        console.log('recommendations', recommendations);

        return recommendations;
    },
};
