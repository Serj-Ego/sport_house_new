import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseSlice from "./slices/baseSlice";
import userSlice from "./slices/userSlice";
import recommendationSlice from "./slices/recommendationSlice";
import sportAreaSlice from "./slices/sportAreaSlice";

/**
 * Настройки для store redux
 */
const rootReducer = combineReducers({
  base: baseSlice,
  user: userSlice,
  recommendation: recommendationSlice,
  sportArea: sportAreaSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["base", "user", "recommendation", "sportArea"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  },
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
