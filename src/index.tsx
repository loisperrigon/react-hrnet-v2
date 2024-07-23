import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Importez Provider depuis react-redux
import { RouterProvider } from "react-router-dom";
import Toasts from "./components/communs/toasts/Toasts";

import "./scss/style.scss";

import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "./context/contextToasts";
import { router } from "./routes/route";
import { persistor, store } from "./store"; // Assurez-vous d'importer votre store depuis ./store

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Enveloppez tout avec Provider et passez le store */}
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
