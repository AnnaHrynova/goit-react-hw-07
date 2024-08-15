import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
      name: "",
    },
    reducers: {
      changeFilter: (state, action) => {
        state.name = action.payload;
      },
    },
  });

  export default filterSlice.reducer;

  export const selectNameFilter = (state) => state.filter.name;
export const { changeFilter } = filterSlice.actions;
