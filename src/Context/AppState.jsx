/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  //const url = "http://localhost:5000/api";
  const url = "https://mern-e-commerce-api-par7.onrender.com/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterData, setFilterData] = useState([]);
  //? Store the data in local storage
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);

  //! Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.products);
      setProducts(api.data.products);
      //! Show filter data
      setFilterData(api.data.products);

      userProfile();
    };
    //? Adding to useEffect because when browser load then the data fetch to loaded
    fetchProduct();
    userCart();
    getAddress();
    userOrders();
  }, [token, reload]);

  //! Take the token from the local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  //! Register User
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    // alert(api.data.message)

    //! Toster
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    console.log("User Register :- ", api);
    return api.data;
  };

  //! Login User
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    // alert(api.data.message)

    //! Toster
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    // console.log("User Login :- ",api.data);
    setToken(api.data.token);
    setIsAuthenticated(true);

    //! seved in local storage
    localStorage.setItem("token", api.data.token);

    return api.data;
  };

  //! Logout User
  const logout = () => {
    setToken("");
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    //Toaster
    toast.success("Logout Successfully...!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //! User Profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    // console.log("Profile of User",api.data);
    setUser(api.data.user);
  };

  //! Add to Cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    // console.log("Cart Product",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //! Get User Cart {userCart in useEffect fetch after rendering od user Cart}
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //  console.log("Cart user :- ",api.data.cart);
    setCart(api.data.cart);
  };

  //! Decrease Qty
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    // console.log("Decrease product :-",`${url}/cart/dec`);
    setReload(!reload);
    console.log("Dec user :- ", api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //! Remove Qty
  const removeQty = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    //  console.log("Remove item from cart :-  ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //! Clear items from Cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    //  console.log("Remove item from cart :-  ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //! Add Shipping Adderess
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    //  console.log("Remove item from cart :-  ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //! Get user Latest Address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //  console.log("User Add :- ",api.data.userAddress);
    //? Save in State
    setUserAddress(api.data.userAddress);
  };

  //! Get user Order
  const userOrders = async () => {
    const api = await axios.get(`${url}/payment/orders`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //console.log("User Add :- ", api.data);
    //? Save in State
    setUserOrder(api.data)
  };

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filterData,
        setFilterData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeQty,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
