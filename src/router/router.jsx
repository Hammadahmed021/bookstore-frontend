import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { BookSingle, Cart, Checkout, Home, Login, Register } from "../pages";
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
          <RestrictedRoute>
            <Login />
          </RestrictedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <RestrictedRoute>
            <Register />
          </RestrictedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <AuthWall>
            <Cart />
          </AuthWall>
        ),
      },
      {
        path: "/checkout",
        element: (
          <AuthWall>
            <Checkout />
          </AuthWall>
        ),
      },
      {
        path: "/book/:id",
        element: <BookSingle />,
      },
      {
        path: "/order",
        element: (
          <AuthWall>
            <h2>Order</h2>
          </AuthWall>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthWall>
            <h2>Dashboard</h2>
          </AuthWall>
        ),
      },
    ],
  },
]);

export default router;
