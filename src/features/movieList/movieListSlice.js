import { createSlice, current } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const movieListSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      localStorage.setItem("cart", JSON.stringify(state));
      // toast("Item added to cart", {
      //   position: "top-center",
      //   autoClose: 2000,
      // });
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      // console.log(cartSlice);
      // console.log(cartSlice.reducer);
      localStorage.setItem("cart", JSON.stringify(state));
      // toast.error("Item removed from cart", {
      //   position: "top-center",
      //   autoClose: 2000,
      // });
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      localStorage.setItem("cart", JSON.stringify(state));
      // toast.success("Cart updated", {
      //   position: "top-center",
      // });
    },
    removeAllItem: (state) => {
      console.log(current(state));
      state.cartItems = [];
      state.numItemsInCart = 0;
      state.cartTotal = 0;
      localStorage.setItem("cart", JSON.stringify(state));
      // toast.success("Your purchase has been confirmed!", {
      //   position: "top-center",
      //   autoClose: 2000,
      // });
    },
  },
});

export const { addItem, clearCart, removeItem, editItem, removeAllItem } = movieListSlice.actions;

export default movieListSlice.reducer;
