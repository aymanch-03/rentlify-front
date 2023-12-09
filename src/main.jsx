import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./globals.css";
import store, { persistor } from "./redux/store.jsx";

import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CookiesProvider>
          <Router>
            <App/>
          </Router>
        </CookiesProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
