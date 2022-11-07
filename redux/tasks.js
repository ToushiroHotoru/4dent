import { createSlice } from "@reduxjs/toolkit";

// хранилище для изменения состояния счетчиков элементов товаров
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: false,
  },
  reducers: {
    setup_tasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setup_tasks } = tasksSlice.actions;

export default tasksSlice.reducer;
