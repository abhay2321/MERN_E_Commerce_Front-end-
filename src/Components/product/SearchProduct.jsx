import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Link, useParams } from "react-router-dom";

const SearchProduct = () => {
  const { products } = useContext(AppContext);

  const [searchProduct, setSearchProducts] = useState([]);

  const { term } = useParams();

  useEffect(() => {
    setSearchProducts(
      products.filter((data) =>
        data?.title?.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [term, products]);

  return (
    <>
      <div
        className="container text-center my-5"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row d-flex justify-content-center align-items-center my-5">
            {searchProduct?.map((product) => (
              <div
                key={product._id}
                className="my-3 col-md-4 d-flex justify-content-center align-items-center"
              >
                <div
                  className="card bg-dark text-light text-center"
                  style={{ width: "18rem" }}
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="d-flex justify-content-center align-items-center p-3"
                  >
                    <img
                      src={product.imgSrc}
                      className="card-img-top"
                      alt={product.title}
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "20px",
                        border: "2px solid orange",
                      }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description.length > 30 ? product?.description.slice(0, 30) + "..." : product?.description}</p>

                    <div className="my-3">
                      <button className="btn btn-primary">
                        {product.price}₹
                      </button>
                      <button className="btn btn-warning mx-3">
                        Add to Cart
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

export default SearchProduct;
