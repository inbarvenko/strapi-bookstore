'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    attributes: {
        title: {
        type: 'string',
        required: true,
        minLength: 1,
        },
        description: {
        type: 'text',
        required: true,
        minLength: 2,
        },
        author: {
        type: 'string',
        minLength: 2,
        required: true,
        },
        isPaperAvailable: {
        type: 'boolean',
        },
        price: {
        type: 'decimal',
        required: true,
        },
        image: {
        type: 'media',
        multiple: false,
        required: false,
        allowedTypes: ['images'],
        },
        rate: {
        type: 'decimal',
        max: 5,
        min: 0,
        },
        bookId: {
        type: 'uid',
        targetField: 'title',
        required: true,
        },
        genre: {
        type: 'string',
        required: true,
        minLength: 4,
        },
    },
};

