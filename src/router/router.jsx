import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { BookSingle, Cart, Checkout, Home, Login, Register } from "../pages";

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
        path: "/order",
        element: <h2>Order</h2>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
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
        element: <BookSingle />
      }
    ],
  },
]);

export default router;
