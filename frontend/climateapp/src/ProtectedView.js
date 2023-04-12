import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Constants from './Constants.json'

//This would be the protected view that only logged in users can see
export default function ProtectedView(props) {
  
    
    
  
  function DeleteAccount() {
    const user = "t"
    axios.delete(Constants.API_ADDRESS + '/users/'+user)
  }
  return (
    <div className="protected">
        <h2>Protected view </h2>
        <button onClick={DeleteAccount}>Delete User</button>
        <div>
          Decoded JWT data from payload<br/>
        </div>
    </div>
  )

}