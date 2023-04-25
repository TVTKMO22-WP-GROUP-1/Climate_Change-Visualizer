import React, {useState} from 'react'
import axios from 'axios'
import Constants from './Constants.json'
import { useNavigate } from 'react-router-dom'


export default function SignUpView() {

    const [signupProcessState, setSignupProcessState] = useState("idle");
    const navigate = useNavigate();

    const HandleSignupSubmit = async (event) => {
        event.preventDefault();
        setSignupProcessState("processing");


        // API call

        try {
            const result = await axios.post(Constants.API_ADDRESS + '/register',
            {
                username: event.target.username.value,
                password: event.target.password.value
            });

            //Error handling
            setSignupProcessState("success");
            setTimeout(() => {
                navigate('/login', { replace: true }); //Navigate to login page if successful
            }, 1500);
        } catch (error) {
            setSignupProcessState("error"); //Alert user if error
            setTimeout(() => {
                setSignupProcessState("idle");
            }, 1500);
        }
};

    //UI controls for signup process

    let signupUiControls = null;
    switch (signupProcessState) {
        case 'idle':
            signupUiControls = <button type="submit">Sign up</button>;
            break;
        case 'processing':
            signupUiControls = <span>Processing...</span>
            break;
        case 'success':
            signupUiControls = <span style = {{color: 'green'}}>Sign up successful!</span>;
            break;
        case 'error':
            signupUiControls = <span style = {{color: 'red'}}>Sign up failed!</span>;
            break;
        default:
            signupUiControls = <button type="submit">Sign up</button>;
    }



    return(
    <div>
        <h2>
            Sign up
        </h2>
        <form onSubmit={ HandleSignupSubmit}>
        <div>
            Username <br/>
            <input type="text" name="username"/>
        </div>
        <div>
            Password <br/>
            <input type="password" name="password"/>
        </div>
        <div>
            {signupUiControls}
        </div>
        </form>
    </div>
    )


}


