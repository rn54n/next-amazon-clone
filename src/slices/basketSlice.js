import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Actions
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // find the item
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      // make copy of current basket and change it
      let newBasket = [...state.items];

      // if it finds item to be removed it would be greater than 0
      if (index >= 0) {
        // The item exists in basket .... remove it
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cannot remove product (id: ${action.payload.id}) as its not in the basket`
        );
      }
      // reassigning the item of the global store to that basket
      state.items = newBasket;
    },
  },
});

// use throughout rest of application
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
