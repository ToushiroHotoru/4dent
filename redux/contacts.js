import { createSlice } from "@reduxjs/toolkit";

// хранилище для изменения состояния счетчиков элементов товаров
export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [
      { name: "Zero", tel: "+79063874717" },
      { name: "One", tel: "+79063874717" },
      { name: "Two", tel: "+79063874717" },
      { name: "Three", tel: "+79063874717" },
      { name: "Four", tel: "+79063874717" },
    ],
  },
  reducers: {
    setup_tasks: (state, action) => {
      state.contacts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setup_contacts } = contactsSlice.actions;

export default contactsSlice.reducer;
