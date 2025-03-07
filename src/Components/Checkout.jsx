import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import TableProduct from "./TableProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);

  //from cart
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart?.items?.length; i++) {
        qty += cart?.items[i].qty;
        price += cart?.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  const handlePayment = async () => {
    try {
      const orderRepons = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      //console.log(" order response ", orderRepons);
      const { orderId, amount: orderAmount } = orderRepons.data;

      var options = {
        key: "rzp_test_5exk6zvWI0NKJW", // Enter the Key ID generated from the Dashboard
        amount: orderAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Abhay Chaurasia",
        description: "Abhay Chaurasia",
        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

        // Save in dp
        handler: async function (response) {
          const paymentData = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            userId: user._id,
            orderItems: cart?.items,
            userShipping: userAddress,
          };

          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData
          );
          console.log("Payment verification response ", api);

          if (api.data.success) {
            // Clear cart after successful payment
            clearCart();
            navigate("/orderConfirmation");
          }
        },
        prefill: {
          name: "Abhay Chaursia",
          email: "abhay@example.com",
          contact: "9305505050",
        },
        notes: {
          address: "Agra",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error by Options", error);
      // alert("Something went wrong while processing payment.");
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center my-3">Order Summery</h1>

        <table className="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Details
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-dark text-light">
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold", color: "green" }}>
                  <li>FullName : {userAddress?.fullName}</li>
                  <li>Phone : {userAddress?.phoneNumber}</li>
                  <li>City : {userAddress?.city}</li>
                  <li>State : {userAddress?.state}</li>
                  <li>Country : {userAddress?.country}</li>
                  <li>PinCode : {userAddress?.pincode} </li>
                  <li>Near By : {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg fw-bold"
          onClick={handlePayment}
        >
          Procced To Pay
        </button>
      </div>
    </>
  );
}

export default Checkout;
