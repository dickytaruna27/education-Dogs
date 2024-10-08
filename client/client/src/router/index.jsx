import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayOut from "../layout/BaseLayOut";
import Register from "../views/Register";
import Login from "../views/Login";
import HomePage from "../views/HomePage";
import AddForm from "../views/AddForm";
import EditPage from "../views/EditPage";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <BaseLayOut />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/add-dogs",
        element: <AddForm />,
      },
      {
        path: "/edit-dogs/:id",
        element: <EditPage />,
      },
    ],
  },
]);

export default router;
