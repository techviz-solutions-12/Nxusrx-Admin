import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./scss/styles.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Router from "./app/router/router";
import { store, persistor } from "./app/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SocketContextProvider } from "./app/context/socketContext";

window.process = {};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ToastContainer />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketContextProvider>
          <Router />
        </SocketContextProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
