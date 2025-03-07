import React from "react";
import { useState, useContext } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

function Address() {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    //alert("Your Form has been Submitted")
    // Add your API call here to register the user

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );
    //  console.log("Shipping Add :-", result)

    if (result.success) {
      navigate("/checkout");
    }

    // clear data for new
    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });

    //  console.log(formData);
  };

  return (
    <>
      <div
        className="container my-4 p-4"
        style={{
          border: "2px solid orange",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">Shipping Address</h1>
        <form onSubmit={onSubmitHandler} className="my-3">
          <div className="row">
            <div className="mb-3 col-md-4">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                fullName
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-secondary text-light"
                id="exampleInputfullName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-secondary text-light"
                id="exampleInputCountry"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label fw-bold"
              >
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-secondary text-light"
                id="exampleInputState"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-4">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-secondary text-light"
                id="exampleInputCity"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                PinCode
              </label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={onChangeHandler}
                type="number"
                className="form-control bg-secondary text-light"
                id="exampleInputPincode"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label fw-bold"
              >
                Phone Number
              </label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangeHandler}
                type="number"
                className="form-control bg-secondary text-light"
                id="exampleInputPhoneNumber"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                Address/Nearby
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-secondary text-light"
                id="exampleInpuAddress"
              />
            </div>
          </div>

          <div className="d-grid col-6 mx-auto my-4">
            <button type="submit" className="btn btn-primary fw-bold">
              Submit
            </button>
          </div>
        </form>

        {userAddress && (
          <div className="d-grid col-6 mx-auto my-4">
            <button
              className="btn btn-warning fw-bold"
              onClick={() => navigate("/checkout")}
            >
              Use Old Address
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Address;
