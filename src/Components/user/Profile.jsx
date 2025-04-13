import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../Context/AppContext';
import ShowOrderProduct from '../ShowOrderProduct';
import { Link } from 'react-router-dom';

function Profile() {
  const { user, userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState();

  useEffect(() => {
    if (userOrder && userOrder.length > 0) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);
  

  return (
    <div className="container my-5">
      {/* Profile Card */}
      <div className="card mb-4 shadow">
        <div className="card-body d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <img
              src={user?.avatar || "/abhays.jpg"}
              alt="Profile"
              className="rounded-circle border"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div className="ms-4">
              <h3 className="mb-1">{user?.name}</h3>
              <p className="mb-0 text-muted">{user?.email}</p>
            </div>
          </div>
          <button className="btn btn-outline-primary">Edit Profile</button>
        </div>
      </div>

      {/* Order Section */}
      <div className="card shadow">
        <div className="card-header bg-dark text-light text-center fs-4">
          Your Latest Order
        </div>
        <div className="card-body p-4">
          {latestOrder ? (
            <div className="row">
              {/* Ordered Items */}
              <div className="col-md-6 mb-4">
                <h5 className="fw-bold text-center mb-3">Ordered Items</h5>
                <div className="border rounded p-3 bg-light">
                  <ShowOrderProduct items={latestOrder.orderItems} />
                </div>
              </div>

              {/* Order Details */}
              <div className="col-md-6 mb-3">
                <h5 className="fw-bold text-center mb-3">Shipping & Order Details</h5>
                <ul className="list-group list-group-flush fs-6">
                  <li className="list-group-item"><strong>Order ID:</strong> {latestOrder.orderId}</li>
                  <li className="list-group-item"><strong>Payment ID:</strong> {latestOrder.paymentId}</li>
                  <li className="list-group-item"><strong>Payment Status:</strong> {latestOrder.payStatus}</li>
                  <li className="list-group-item"><strong>Full Name:</strong> {latestOrder.userShipping?.fullName}</li>
                  <li className="list-group-item"><strong>Phone:</strong> {latestOrder.userShipping?.phoneNumber}</li>
                  <li className="list-group-item"><strong>City:</strong> {latestOrder.userShipping?.city}</li>
                  <li className="list-group-item"><strong>State:</strong> {latestOrder.userShipping?.state}</li>
                  <li className="list-group-item"><strong>Country:</strong> {latestOrder.userShipping?.country}</li>
                  <li className="list-group-item"><strong>Pin Code:</strong> {latestOrder.userShipping?.pincode}</li>
                  <li className="list-group-item"><strong>Address:</strong> {latestOrder.userShipping?.address}</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted fs-5">No recent orders found.</div>
          )}
        </div>
        <Link to="/my-orders" className="btn btn-primary mt-3">
  View All Orders
</Link>


      </div>
    </div>
  );
}

export default Profile;
