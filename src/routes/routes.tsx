// routes.js
import { createBrowserRouter } from "react-router-dom";

import Formulaire from "../pages/Formulaire/Formulaire";
import Users from "../pages/Users/Users";
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
