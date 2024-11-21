import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, Login, Register } from "../pages";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/order",
            element: <h2>Order</h2>
        },
        {
          path: "/login",
          element: <Login />
      },
      {
        path: "/register",
        element: <Register />
    }
      ]
    },
  ]);

  export default router;