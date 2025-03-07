import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, decreaseQty, addToCart, removeQty, clearCart } =
    useContext(AppContext);
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

  console.log("Cart:- ", cart);

  return (
    <>
      {/* Total Qty and Price in cart */}
      {/* condiction for showing totle qty and price */}
      {cart?.items?.length == 0 ? (
        <>
          <div className="text-center my-5">
            <button
              className="btn btn-warning mx-3 "
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
              onClick={() => navigate("/")}
            >
              Continue Shopping....
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="my-5 text-center">
            <button
              className="btn btn-info mx-3"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Total Qty :- {qty}
            </button>

            <button
              className="btn btn-warning mx-3"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Total price :- {price}
            </button>
          </div>
        </>
      )}

      {/* Cart Items */}
      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container p-1 bg-dark my-5 text-center"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt={product.title}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
              />
            </div>

            <div className="cart_des text-light">
              <h4>{product.title}</h4>
              <p style={{ fontWeight: "bold" }}>{product.price}</p>
              <p style={{ fontWeight: "bold" }}>Qty:- {product.qty}</p>
            </div>

            <div className="cart_action">
              <button
                className="btn btn-warning mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => decreaseQty(product?.productId, 1)}
              >
                Qty--
              </button>

              <button
                className="btn btn-primary mx-3"
                style={{ fontWeight: "bold", fontSize: "14px" }}
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc
                  )
                }
              >
                Increase Qty [+]
              </button>

              <button
                className="btn btn-danger mx-3"
                style={{ fontWeight: "bold", fontSize: "14px" }}
                onClick={() => {
                  if (
                    confirm("Are you sure you want to remove fron the cart")
                  ) {
                    removeQty(product?.productId);
                  }
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {/** When No item in the cart so remove the buttom automatically */}
      {cart?.items?.length > 0 && (
        <div className="container text-center mb-3">
          {/* Check0ut button */}
          <button
            className="btn btn-warning mx-3 fw-bold"
            style={{ fontWeight: "bold" }}
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </button>

          {/* clear Cart button */}
          <button
            className="btn btn-danger mx-3 fw-bold"
            onClick={() => {
              if (confirm("Are you sure you want to clear the cart..?")) {
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
}

export default Cart;
