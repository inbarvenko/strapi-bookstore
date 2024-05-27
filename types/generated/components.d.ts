import type { Schema, Attribute } from '@strapi/strapi';

export interface BasketBasket extends Schema.Component {
  collectionName: 'components_basket_baskets';
  info: {
    displayName: 'Basket';
    icon: 'priceTag';
  };
  attributes: {
    bookId: Attribute.String;
    bookNumber: Attribute.Integer;
  };
}

export interface IdsBooksFavorites extends Schema.Component {
  collectionName: 'components_favorite_books_favorites';
  info: {
    displayName: 'BookIds';
    icon: 'heart';
    description: '';
  };
  attributes: {
    bookId: Attribute.String & Attribute.DefaultTo<'[]'>;
  };
}

export interface OrdersOrdersData extends Schema.Component {
  collectionName: 'components_orders_orders_data';
  info: {
    displayName: 'ordersData';
    icon: 'shoppingCart';
    description: '';
  };
  attributes: {
    totalPrice: Attribute.Decimal;
    bookData: Attribute.Component<'basket.basket', true>;
  };
}

export interface OrdersOrders extends Schema.Component {
  collectionName: 'components_orders_orders';
  info: {
    displayName: 'orders';
    icon: 'handHeart';
    description: '';
  };
  attributes: {};
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'basket.basket': BasketBasket;
      'ids-books.favorites': IdsBooksFavorites;
      'orders.orders-data': OrdersOrdersData;
      'orders.orders': OrdersOrders;
    }
  }
}
