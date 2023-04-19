import React from 'react'
import axios from 'axios'
import Constants from './Constants.json'

//This would be the protected view that only logged in users can see
export default function ProtectedView(props) {
  
  function DeleteAccount() {
    const element = document.getElementById('userinput')
    const value = element.value
    axios.delete(Constants.API_ADDRESS + '/users/'+value)
  }
  return (
    <div className="protected">
        <h2>Protected view </h2>

        <form>
            <div>
            Username<input type="text" id ="userinput" name="username"/>
                <button onClick={DeleteAccount}>Delete User</button>
            </div>
        </form>

        <div>
          Decoded JWT data from payload<br/>
        </div>
    </div>
  )

}