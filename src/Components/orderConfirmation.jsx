import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/AppContext'
import ShowOrderProduct from './ShowOrderProduct'

function OrderConfirmation() {
    const {userOrder} = useContext(AppContext)
    const [latestOrder, setLatestOrder] = useState({})
    useEffect(() => {
         if(userOrder){
             setLatestOrder(userOrder[0])
         }
    },[userOrder])

    console.log("LATEST ORDER: ", latestOrder)

  return (
    <>
     <div className="container my-5">
        <h1 className='text-center'>Your Order has been confirm,</h1>
        <h3 className='text-center'>It will delivered soon..</h3>
     </div>

<div className="container">

        <table className="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                OrderedItems
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                OrederDetails & ShippingAddress
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-dark text-light">
                <ShowOrderProduct items={latestOrder?.orderItems} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold", color: "green" }}>
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

      {/* <div className="container text-center my-5">
        <button className="btn btn-secondary btn-lg fw-bold"  
        >Procced To Pay
        </button>
      </div> */}

    </>
  )
}

export default OrderConfirmation
