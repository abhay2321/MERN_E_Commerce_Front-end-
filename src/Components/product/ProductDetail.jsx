import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../Context/AppContext";

const ProductDetail = () => {
  const { addToCart } = useContext(AppContext);
  const [product, setProduct] = useState();
  const { id } = useParams();

  // Fetch product data from API
  const url = "http://localhost:5000/api";

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });

    //   console.log(api.data);
         setProduct(api.data.product);
    };
    fetchProduct();
  }, [id]);

  return <>
    <div className="container text-center my-5" style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    }}>
        <div className="left">
           <img src={product?.imgSrc} alt="" style={{width:'250px', height:'250px', borderRadius:'10px', border:"2px solid orange"}} /> 
        </div>
        <div className="right">
            <h1 className="soft-shadow">{product?.title}</h1>
            <div className="dec text-center" style={{fontWeight:"450", width:"450px"}}>
            <p>{product?.description}</p>
            </div>
            <h1>{product?.price}{""}{"₹"}</h1>

            <div className="my-5">
            <button className="btn btn-danger mx-3" style={{fontWeight:'bold'}}>Buy Now</button>
            <button className="btn btn-warning" style={{fontWeight:'bold'}}
                 onClick={() =>
                  addToCart(
                    product._id,
                    product.title,
                    product.price,
                    1,
                    product.imgSrc
                  )
                }
            >Add to Cart</button>
            </div>

        </div>
    </div>

{/* ! Rwlated Product */}
<RelatedProduct category={product?.category}/>

  </>
};

export default ProductDetail;
