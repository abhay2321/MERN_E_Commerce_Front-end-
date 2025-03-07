import React, { useContext, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import AppContext from "../Context/AppContext";

function TableProduct({ cart }) {
  const { decreaseQty, addToCart, removeQty, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

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

  return (
    <>
      <table className="table table-bordered border-primary text-center">
        <thead>
          <tr>
            <th scope="col" className="bg-dark text-light">
              Profuct Img
            </th>
            <th scope="col" className="bg-dark text-light">
              Titlet
            </th>
            <th scope="col" className="bg-dark text-light">
              Price
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty++
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty--
            </th>
            <th scope="col" className="bg-dark text-light">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr key={product._id}>
              <th scope="row" className="bg-dark text-light">
                <img
                  src={product.imgSrc}
                  style={{ width: "50px", height: "50px" }}
                />
              </th>
              <td className="bg-dark text-light">{product.title}</td>
              <td className="bg-dark text-light">{product.price}</td>
              <td className="bg-dark text-light">{product.qty}</td>
              <td className="bg-dark text-light">
                <IoMdAddCircleOutline
                  onClick={() =>
                    addToCart(
                      product?.productId,
                      product.title,
                      product.price / product.qty,
                      1,
                      product.imgSrc
                    )
                  }
                  size={23}
                  color="blue"
                />
              </td>
              <td className="bg-dark text-light">
                <GrSubtractCircle
                  onClick={() => decreaseQty(product?.productId, 1)}
                  size={23}
                  color="blue"
                />
              </td>
              <td className="bg-dark text-light">
                <MdDeleteForever
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to remove fron the cart")
                    ) {
                      removeQty(product?.productId);
                    }
                  }}
                  size={24}
                  color="red"
                />
              </td>
            </tr>
          ))}

          <tr>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light">
              <button className="btn btn-primary fw-bold">Total</button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-warning fw-bold">{price}</button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-info fw-bold">{qty}</button>
            </td>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default TableProduct;
