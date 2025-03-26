import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category }) => {
  const { products, addToCart } = useContext(AppContext);

   const [relatedProduct, setRelatedProducts] = useState([])

  useEffect(()=> {
    setRelatedProducts(products.filter((data)=>data?.category?.toLowerCase() === category?.toLowerCase()))
  },[category,products])

  return (
    <>
      <div className="container text-center">
        <h1 className="soft-shadow"> Related Products of {category}</h1>

        <div className="container d-flex justify-content-center align-items-center">
        <div className="row d-flex justify-content-center align-items-center my-5">
    {relatedProduct?.map((product) => (
        <div key={product._id} className="my-3 col md-4 d-flex justify-content-center align-items-center">
          <div className="card bg-dark text-light text-center" style={{ width: "18rem" }}>
            <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center p-3">
              <img
                src={product.imgSrc}
                className="card-img-top"
                alt={product.title}
                style={{width:'200px', height:'200px', borderRadius:'20px', border:'2px solid orange'}}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description.length > 25 ? product?.description.slice(0, 25) + "..." : product?.description}</p>

            <div className="my-3">
              <button className="btn btn-primary">
              {product.price}₹
              </button>
              <button className="btn btn-warning mx-3"
                    onClick={() =>
                      addToCart(
                        product._id,
                        product.title,
                        product.price,
                        1,
                        product.imgSrc
                      )
                    }
              > Add to Cart
              </button>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
    </div>

      </div>
    </>
  );
};

export default RelatedProduct;
