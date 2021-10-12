import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "../root/root_reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../root/root_saga";
// import authenticateMiddleware from "../store/authenticateMiddleware";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();
const devMode = process.env.NODE_ENV !== "production";

const persistConfig = {
  key: "notifications",
  whitelist: ["notifications"],
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
  sagaMiddleware,
  //   authenticateMiddleware,
];

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: devMode,
});
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
