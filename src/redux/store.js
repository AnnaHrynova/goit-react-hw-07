import { configureStore } from "@reduxjs/toolkit";
import contactReducer from '../redux/contactsSlice';
import filterReducer from '../redux/filtersSlice'


export const store = configureStore({
    reducer: {
      contacts: contactReducer,
      filter: filterReducer,
    },
  });