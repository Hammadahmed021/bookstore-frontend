import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getImgUrl } from "../utils/getImage";
import {
  emptyCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../store/features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculate total price based on quantity
  const totalPrice = cartItems
    ?.reduce((acc, item) => acc + item.newPrice * item.quantity, 0)
    .toFixed(2);

  const handleClearCart = () => {
    dispatch(emptyCart());
  };

  const removeFromCartItem = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleQuantityChange = (product, type) => {
    const updatedQuantity =
      type === "increment" ? product.quantity + 1 : product.quantity - 1;

    if (updatedQuantity > 0) {
      dispatch(
        updateCartItemQuantity({ id: product._id, quantity: updatedQuantity })
      );
    }
  };

  const handleNavigate = () => {
    navigate("/checkout", { state: { totalPrice } });
  };

  return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="text-lg font-medium text-gray-900">Shopping cart</div>
          <div className="ml-3 flex h-7 items-center ">
            <button
              type="button"
              onClick={handleClearCart}
              className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200"
            >
              <span className="">Clear Cart</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            {cartItems?.length > 0 ? (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems?.map((product) => (
                  <li className="flex py-6" key={product?._id}>
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product?.title}
                        src={`${getImgUrl(product?.coverImage)}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/book/${product?._id}`}>
                              {product?.title}
                            </Link>
                          </h3>
                          <p className="sm:ml-4">
                            $
                            {(product?.newPrice * product?.quantity).toFixed(
                              2
                            )}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 capitalize">
                          <strong>Category:</strong> {product?.category}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleQuantityChange(product, "decrement")
                            }
                            className="px-2 py-1 border rounded-md text-gray-700 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <p className="mx-3">{product?.quantity}</p>
                          <button
                            onClick={() =>
                              handleQuantityChange(product, "increment")
                            }
                            className="px-2 py-1 border rounded-md text-gray-700 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => removeFromCartItem(product)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No product found.</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalPrice ? totalPrice : 0}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        {cartItems?.length > 0 && (
          <div className="mt-6">
            <button
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              onClick={handleNavigate}
            >
              Checkout
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <Link to="/">
            or
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
