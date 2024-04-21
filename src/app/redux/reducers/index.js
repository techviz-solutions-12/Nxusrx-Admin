import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import auth from "../../services/auth";
import Combined from "../../services/combinedAuth";
import business from "../../services/business";
import dashboard from "../../services/dasboard";
import orders from "../../services/orders";
import products from "../../services/products";
import { socketServer } from "../../realtimeCommunication/socketConnection";

/**
 * all available reducers are wrapped by the combine reducers function
 */

const rootReducer = combineReducers({
  home: () => null,
  auth,
  dashboard,
  orders,
  business,
  products,
});

const appReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    storage.removeItem("persist:root");
    storage.removeItem("persist:DATA_PERSISTANT_KEY");
    let sockets = state?.auth?.sockets;

    if (socketServer()) {
      socketServer().emit("forceDisconnect", sockets);
    }
    localStorage.removeItem("token");
    state = undefined;
  }

  return rootReducer(state, action);
};

export default appReducer;
