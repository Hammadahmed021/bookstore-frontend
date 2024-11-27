import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../components";
import { useCreateOrderMutation } from "../store/features/orders/orderApi";
import { showSuccessToast } from "../utils/toast";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate()
  const total = location.state?.totalPrice;
  const cartItems = useSelector((state) => state.cart.cartItems);

  const checkUser = useSelector((state) => state.auth.user);
  console.log(checkUser, "checkUser");

  useEffect(() => {}, [checkUser]);


  const [createOrder, { isLoading, isError, isSuccess, error }] = useCreateOrderMutation();

  const onSubmit = async (data) => {
    console.log(data, "data");

    const orderDetails = {
      name: data?.name,
      email: data?.email || checkUser?.email,
      phone: data?.phone,
      address: {
        address: data?.address,
        city: data?.city,
        country: data?.country,
        state: data?.state,
        zipcode: data?.zipcode,
      },
      products: cartItems.map((item) => ({
        title: item.title,
        price: item.newPrice, // Ensure 'newPrice' exists in your cart items
        quantity: item.quantity,
      })),
      totalPrice: total,
    };

    console.log(orderDetails, "orderDetails");

    try {
      const response = await createOrder(orderDetails).unwrap();
      if(response){
        showSuccessToast("Order created successfully")
        setTimeout(() => {
          navigate('/order')
        }, 1000);

      }
      console.log("Order created successfully:", response);
      // Add any additional logic, e.g., redirecting to a success page
    } catch (err) {
      console.error("Failed to create order:", err);
      // Handle the error
    }
  };

  return (
    <div className="p-6  flex items-center justify-center">
      <div className="max-w-screen-2xl mx-auto">
        <div>
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">
              Cash On Delivery
            </h2>
            <p className="text-gray-500 mb-2">Total Price: ${total}</p>
            <p className="text-gray-500 mb-6">Items:{cartItems?.length}</p>
          </div>

          <div className="bg-white rounded-lg border p-4 px-4 md:p-8 mb-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
            >
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name</label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="name"
                      register={register}
                      errors={errors}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label html="email">Email Address</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email"
                      defaultValue={(checkUser && checkUser?.email) || ""}
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label html="phone">Phone Number</label>

                    <Input
                      id="phone"
                      type="number"
                      placeholder="+123 456 7890"
                      register={register}
                      errors={errors}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="address">Address / Street</label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="address"
                      register={register}
                      errors={errors}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">City</label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="city"
                      register={register}
                      errors={errors}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">Country / region</label>
                    <Input
                      id="country"
                      type="text"
                      placeholder="country"
                      register={register}
                      errors={errors}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="state">State / province</label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="state"
                      register={register}
                      errors={errors}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <Input
                      id="zipcode"
                      type="text"
                      placeholder="zipcode"
                      register={register}
                      errors={errors}
                    />
                  </div>

                  <div className="md:col-span-5 mt-3">
                    <div className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="billing_same"
                        id="billing_same"
                        className="form-checkbox"
                      />
                      <label htmlFor="billing_same" className="ml-2 ">
                        I agree to the{" "}
                        <Link className="underline underline-offset-2 text-blue-600">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link className="underline underline-offset-2 text-blue-600">
                          Shoping Policy.
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        // disabled={!isChecked}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Place an Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
