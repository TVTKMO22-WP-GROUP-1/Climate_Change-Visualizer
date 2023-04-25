import React, {useState} from 'react'
import axios from 'axios'
import Constants from './Constants.json'
import { useNavigate } from 'react-router-dom'

export default function DeleteView() {
    const [deleteProcessState, setdeleteProcessState] = useState("idle");
    const navigate = useNavigate();

    const HandledeleteSubmit = async (event) => {
        event.preventDefault();
        setdeleteProcessState("processing");
        try {
            const result = await axios.delete(Constants.API_ADDRESS + '/users/'+event.target.username.value,
            {
                username: event.target.username.value,
                password: event.target.password.value,
            });
            setdeleteProcessState("success");
            setTimeout(() => {
                navigate('/', { replace: true }); //Navigate to index page if successful
                window.location.reload(true)
            }, 1500);
        } catch (error) {
            console.log(error)
            setdeleteProcessState("error"); //Alert user if error
            setTimeout(() => {
            setdeleteProcessState("idle");
            }, 1500);
        }
};
    //UI controls for delete process
    let deleteUiControls = null;
    switch (deleteProcessState) {
        case 'idle':
            deleteUiControls = <button type="submit">Delete</button>;
            break;
        case 'processing':
            deleteUiControls = <span>Processing...</span>
            break;
        case 'success':

            deleteUiControls = <span style = {{color: 'green'}}>User delete successful!</span>;


            break;
        case 'error':
            deleteUiControls = <span style = {{color: 'red'}}>User delete failed!</span>;
            break;
        default:
            deleteUiControls = <button type="submit">Delete</button>;
    }
    return(
    <div>
        <h2>
            Delete
        </h2>
        <form onSubmit={ HandledeleteSubmit}>
            <div>
                Username <br/>
                <input type="text" name="username"/>
            </div>
            <div>
                password <br/>
                <input type="text" name="password"/>
            </div>
            <div>
                {deleteUiControls}
            </div>
        </form>
    </div>
    )
}