import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  BookSingle,
  Cart,
  Checkout,
  Home,
  Login,
  Order,
  Register,
} from "../pages";
import { AuthWall, RestrictedRoute } from "../components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthWall authentication={false}>
            <Login />
          </AuthWall>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthWall authentication={false}>
            <Register />
          </AuthWall>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/book/:id",
        element: <BookSingle />,
      },
      {
        path: "/order",
        element: (
          <AuthWall authentication={true}>
            <Order />
          </AuthWall>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthWall authentication={true}>
            <h2>Dashboard</h2>
          </AuthWall>
        ),
      },
    ],
  },
]);

export default router;
