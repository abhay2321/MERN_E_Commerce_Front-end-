import React, { useContext } from 'react'
import AppContext from '../../Context/AppContext'

function Profile() {
    const { user } = useContext(AppContext)

  return (
    <>
     <div className="container text-center my-5">

        <h1>Welcome, {user?.name}!</h1>
        <h3>Email: {user?.email}</h3>
       
        {/* <button className="btn btn-primary">Edit Profile</button>
        <button className="btn btn-danger ml-3">Logout</button>
        <button className="btn btn-success ml-3">Change Password</button> */}

     </div>
    </>
  )
}

export default Profile
