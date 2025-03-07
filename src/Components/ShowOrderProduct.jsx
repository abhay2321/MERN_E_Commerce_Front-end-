import React, { useEffect, useState } from "react";


function ShowOrderProduct({ items }) {

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (items) {
      for (let i = 0; i < items?.length; i++) {
        qty += items[i].qty;
        price += items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [items]);

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
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => (
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
            </tr>
          ))}

          <tr>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"><button className="btn btn-primary fw-bold">Total</button></td>
            <td className="bg-dark text-light"><button className="btn btn-warning fw-bold">{price}</button></td>
            <td className="bg-dark text-light"><button className="btn btn-info fw-bold">{qty}</button></td>
         
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ShowOrderProduct;
