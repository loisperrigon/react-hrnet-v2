// routes.js
import { createBrowserRouter } from "react-router-dom";

import Formulaire from "../Pages/formulaire/formulaire";
import Users from "../Pages/users/users";
const routerConfig = [
  {
    path: "/",
    element: (
      <>
        <Formulaire />
      </>
    ),
  },
  {
    path: "/Users",
    element: (
      <>
        <Users />
      </>
    ),
  },
];

export const router = createBrowserRouter(routerConfig);
