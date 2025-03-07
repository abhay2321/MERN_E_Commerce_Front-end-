import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { TiShoppingCart } from "react-icons/ti";
import AppContext from "../Context/AppContext";

function Navber() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  //! second navigation
  const { setFilterData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);
  // console.log("Usrt Cart :-", cart)

  //! filter by Category
  const filterbyCategory = (cat) => {
    setFilterData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
  };

  //! filter by Price
  const filterbyPrice = (price) => {
    setFilterData(products.filter((data) => data.price >= price));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to={"/"}
            className="left"
            style={{
              textDecoration: "none",
            }}
          >
            <h3 className="soft-shadow text-dark font-weight-bold fw-bold">
              E-Commerce -Abhay Chaurasia
            </h3>
          </Link>

          <form className="search_bar" onSubmit={handleSearch}>
            <ImSearch />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder=" Search for Products....."
            />
          </form>

          {/* when  isAuthenticated then Show */}

          <div className="right">
            {isAuthenticated && (
              <>
                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative mx-3"
                >
                  <div className="cartImg">
                    <TiShoppingCart size={24} />
                  </div>

                  {/* Showing the cart items count */}
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>

                <Link to={"/profile"} className="btn btn-info mx-3">
                  Profile
                </Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            )}

            {/* when  isAuthenticated then Hide */}
            {!isAuthenticated && (
              <>
                <Link to={"/register"} className="btn btn-info mx-3">
                  Register
                </Link>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        {location.pathname == "/" && (
          <div className="sub_bar">
            <div
              className="soft-shadow text-dark font-weight-bold fw-bold"
              onClick={() => setFilterData(products)}
            >
              No Filter
            </div>
            <div
              className="soft-shadow text-dark font-weight-bold fw-bold"
              onClick={() => filterbyCategory("mobile phone")}
            >
              Mobiles
            </div>
            <div
              className="soft-shadow text-dark font-weight-bold fw-bold"
              onClick={() => filterbyCategory("jeans")}
            >
              jeans
            </div>
            <div
              className="soft-shadow text-dark font-weight-bold fw-bold"
              onClick={() => filterbyCategory("shirts")}
            >
              Shirt
            </div>
            <div
              className="soft-shadow text-dark font-weight-bold fw-bold"
              onClick={() => filterbyCategory("perfume")}
            >
              Prefume
            </div>
            <div
              className="soft-shadow text-dark font-weight-bold fw-bold"
              onClick={() => filterbyCategory("t-shirts")}
            >
              Mens t-shirts
            </div>
            <div
              className="soft-shadow text-dark font-weight-bold fw-bold"
              onClick={() => filterbyPrice(400)}
            >
              400
            </div>
            <div
              className="soft-shadow text-dark font-weight-bold fw-bold"
              onClick={() => filterbyPrice(1200)}
            >
              1200
            </div>
            <div
              className="soft-shadow text-dark font-weight-bold fw-bold"
              onClick={() => filterbyPrice(45000)}
            >
              45000
            </div>
            <div
              className="soft-shadow text-dark font-weight-bold fw-bold"
              onClick={() => filterbyPrice(120000)}
            >
              120000
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navber;
