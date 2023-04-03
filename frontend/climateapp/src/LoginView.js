import React from 'react'
import axios from 'axios'
import Constants from './Constants.json'
import { useNavigate } from 'react-router-dom'



export default function LoginView(props) {

  const navigate = useNavigate();

  //Check if user is signed up

  const HandleLoginSubmit = async (event) => {
      event.preventDefault();
    try {
      const result = await axios.post(Constants.API_ADDRESS + '/jwtLogin',
      null,
      {
          auth: {
              username: event.target.username.value,
              password: event.target.password.value
      }
  }
);

      console.log(result);
      const receivedJWT = result.data.token;
      //props.login(receivedJWT);
      navigate('/', { replace: true }); //Navigate to home page


  } catch (error) {
      console.log(error)
  }
};

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={HandleLoginSubmit}>
        <div>
          Username<br/>
          <input type="text" name="username"/>
          </div>
          <div>
            Password<br/>
            <input type="password" name="password"/>
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
    </div>
  )
}
