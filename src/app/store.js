import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "../features/usersSlice";
import { dataReducer } from "../features/dataSlice";
import { tradeReducer } from "../features/tradeSlice";

const usersPersistConfig = {
  key: "skynetUser:user",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  userState: persistReducer(usersPersistConfig, userReducer),
  dataState: persistReducer(usersPersistConfig, dataReducer),
  tradeState: persistReducer(usersPersistConfig, tradeReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);
