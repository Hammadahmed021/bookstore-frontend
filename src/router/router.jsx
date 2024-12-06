import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  AdminBooks,
  AdminLogin,
  AdminMain,
  AdminOrders,
  AdminUser,
  BookSingle,
  Cart,
  Checkout,
  Dashboard,
  Home,
  Login,
  Order,
  OrderSingle,
  Register,
  BookPost,
  AdminCategory,
  BookUpdate,
  CategorySingle,
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
        path: "/category/:id",
        element: <CategorySingle />,
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
        path: "/order/:id",
        element: (
          <AuthWall authentication={true}>
            <OrderSingle />
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
      // Admin routes grouped under /admin
      {
        path: "/admin",
        element: (
          <AuthWall authentication={true} requiredRole="admin">
            <AdminMain />
          </AuthWall>
        ),
        children: [
          {
            path: "orders", // Child route
            element: (
              <AuthWall authentication={true} requiredRole="admin">
                <AdminOrders />
              </AuthWall>
            ),
          },
          {
            path: "books", // Child route
            element: (
              <AuthWall authentication={true} requiredRole="admin">
                <AdminBooks />
              </AuthWall>
            ),
          },
          {
            path: "users", // Child route
            element: (
              <AuthWall authentication={true} requiredRole="admin">
                <AdminUser />
              </AuthWall>
            ),
          },
          {
            path: "dashboard", // Child route
            element: (
              <AuthWall authentication={true} requiredRole="admin">
                <Dashboard />
              </AuthWall>
            ),
          },
          {
            path: "add-book", // Child route
            element: (
              <AuthWall authentication={true} requiredRole="admin">
                <BookPost />
              </AuthWall>
            ),
          },
          {
            path: "categories", // Child route
            element: (
              <AuthWall authentication={true} requiredRole="admin">
                <AdminCategory />
              </AuthWall>
            ),
          },
          {
            path: "edit-book/:id",
            element: (
              <AuthWall authentication={true} requiredRole="admin">
                <BookUpdate />
              </AuthWall>
            ),
          },

          // Add more admin child routes here
        ],
      },

      // Admin login route (only accessible to non-authenticated users)
      {
        path: "/admin/login",
        element: (
          <AuthWall authentication={false}>
            <AdminLogin />
          </AuthWall>
        ),
      },
    ],
  },
]);

export default router;
