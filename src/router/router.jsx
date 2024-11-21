import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages";

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
        }
      ]
    },
  ]);

  export default router;