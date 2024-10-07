import React, { useReducer } from 'react';

const CartContext = React.createContext({
  items: [],
  itemsFavourite:[],
  addItem: (item) => {},
  addItem1: (item) => {},

  removeItem: (id) => {},
  clearCart: () => {},
});



export default CartContext;
