import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Importez Provider depuis react-redux
import { RouterProvider } from "react-router-dom";
import Toasts from "./components/common/Toasts/Toasts";

import "./scss/style.scss";

import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "./context/ToastContext";
import { router } from "./routes/routes";
import { persistor, store } from "./store"; // Assurez-vous d'importer votre store depuis ./store

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <Toasts />
        </PersistGate>
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);
