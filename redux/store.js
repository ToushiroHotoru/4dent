import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import tasksReducer from "./tasks";
import contactsReducer from "./contacts";

// общий reducer для всех состояний

export default configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    contacts: contactsReducer,
  },
});
