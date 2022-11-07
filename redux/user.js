import { createSlice } from "@reduxjs/toolkit";

// хранилище для изменения состояния счетчиков элементов товаров
export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    bx24Id: 0,
  },
  reducers: {
    setup_name: (state, action) => {
      state.name = action.payload;
    },
    setup_bx24Id: (state, action) => {
      state.bx24Id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setup_name, setup_bx24Id } = userSlice.actions;

export default userSlice.reducer;
