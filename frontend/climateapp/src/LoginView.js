import React from 'react'
import axios from 'axios'
import Constants from './Constants.json'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'



export default function LoginView(props) {
  const [loginProcessState, setLoginProcessState] = useState("idle");
  const navigate = useNavigate();

  //Check if user is signed up

  const HandleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoginProcessState("processing");
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
      const receiwedJWT = result.data.token;
      props.login(receiwedJWT);
      setLoginProcessState("success");
      setTimeout(() => {
        navigate('/', { replace: true }); //Navigate to home page
      }, 1500);
    } catch (error) {
      console.log(error)
      setLoginProcessState("error"); //Alert user if error
      setTimeout(() => {
        setLoginProcessState("idle");
      }, 1500);
    }
  };

let loginUiControls = null;
switch (loginProcessState) {
    case 'idle':
        loginUiControls = <button type="submit">Login</button>;
        break;
    case 'processing':
        loginUiControls = <span>Processing...</span>
        break;
    case 'success':
        loginUiControls = <span style = {{color: 'green'}}>Login successful!</span>;
        break;
    case 'error':
        loginUiControls = <span style = {{color: 'red'}}>Login failed!</span>;
        break;
    default:
        loginUiControls = <button type="submit">Login</button>;
}

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
              {loginUiControls}
            </div>
          </form>
    </div>
  )
}
