import React from "react";
import { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { name, email, password } = formData;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    //alert("Your Form has been Submitted")
    // Add your API call here to register the user
    const result = await register(name, email, password);

    if (result.success) {
      navigate("/login");
    }

   //  console.log(formData);
  };

  return (
    <>
      <div
        className="container my-5 p-4"
        style={{
          width: "600px",
          border: "2px solid orange",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">User Register</h1>
        <form onSubmit={onSubmitHandler} className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="d-grid col-6 mx-auto my-4">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
