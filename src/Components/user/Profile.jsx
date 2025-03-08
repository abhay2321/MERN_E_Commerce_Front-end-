import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context/AppContext'
import ShowOrderProduct from '../ShowOrderProduct'

function Profile() {
    const { user } = useContext(AppContext)

    const {userOrder} = useContext(AppContext)
    const [latestOrder, setLatestOrder] = useState({})
    useEffect(() => {
         if(userOrder){
             setLatestOrder(userOrder[0])
         }
    },[userOrder])
  //  console.log("Profile Data:-", latestOrder)

  return (
    <>
     <div className="container text-center my-5">

        <h1>Welcome, {user?.name}!</h1>
        <h3>Email: {user?.email}</h3>

<div className="container">

<table className="table table-bordered border-primary">
  <thead>
    <tr>
      <th scope="col" className="bg-dark text-light text-center">
        OrderedItems
      </th>
      <th scope="col" className="bg-dark text-light text-center">
        Order Confirmation Details
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="bg-dark text-light">
        <ShowOrderProduct items={latestOrder?.orderItems} />
      </td>
      <td className="bg-dark text-light">
        <ul className="text-start" style={{ fontWeight: "bold"  }}>
          <li>OrderId : {latestOrder?.orderId}</li>
          <li>PaymentId : {latestOrder?.paymentId}</li>
          <li>Payment Status : {latestOrder?.payStatus}</li>
          <li>FullName : {latestOrder?.userShipping?.fullName}</li>
          <li>Phone : {latestOrder?.userShipping?.phoneNumber}</li>
          <li>City : {latestOrder?.userShipping?.city}</li>
          <li>State : {latestOrder?.userShipping?.state}</li>
          <li>Country : {latestOrder?.userShipping?.country}</li>
          <li>PinCode : {latestOrder?.userShipping?.pincode} </li>
          <li>Near By : {latestOrder?.userShipping?.address}</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
</div>

     </div>
    </>
  )
}

export default Profile
