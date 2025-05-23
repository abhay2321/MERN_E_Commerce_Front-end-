import React from "react";
import { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { email, password } = formData;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    //alert("Your Form has been Submitted")
    
    // Add your API call here to login the user
    const result = await login(email, password);

    if (result.success) {
      navigate("/");
    }

    console.log(formData);
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
        <h1 className="text-center">User Login</h1>
        <form onSubmit={onSubmitHandler} className="my-3">
      
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
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
