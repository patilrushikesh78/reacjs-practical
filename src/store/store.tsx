// store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import tab from "../reducers/tab";
import product from "../reducers/product";

const rootReducer = combineReducers({
  tabs: tab,
  products: product,
});

const persistConfig = {
  key: "authType",
  storage: storage,
  whitelist: ["tabs"], // which reducer want to store
};
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);
export { persistor, store };

declare global {
  type RootState = ReturnType<typeof store.getState>;
}
declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
// export default { store, persistor };
