import './Home.css';
import React from 'react'
import {Link} from 'react-router-dom'
import Visualization1 from './Visualization1';
import Visualization2 from './Visualization2';
import Visualization3 from './Visualization3';
import Visualization4 from './Visualization4';
import Visualization5 from './Visualization5';


function GoToLogin() {
  return (
    <Link to="/login">
      <button>Login</button>
    </Link>
  );
}


function GoToSignUp() {
  return (
    <Link to="/signup">
      <button>Sign Up</button>
    </Link>
  );
}

function GoToProtected() {
  return (
    <Link to="/protected">
      <button>Delete user</button>
    </Link>
  );
}


function View1() {
  return (
    <div className="headline-container">
      <div className="headline-block">
        <div className="text-container">
          <h2>View N1</h2>
          <p>Visualizations 1-3</p>
        </div>
      </div>
    </div>
  );
}

function View2() {
  return (
    <div className="headline-container">
      <div className="headline-block">
        <div className="text-container">
          <h2>View N2</h2>
          <p>Visualizations 4-5</p>
        </div>
      </div>
    </div>
  );
}

function View3() {

  return (
    <div className="headline-container">
      <div className="headline-block">
        <div className="text-container">
          <h2>View N3</h2>
        
          <p>User made view</p>
        </div>
      </div>
    </div>
  );
}
export default function Home(props) {
  return (
    <div>
      <div>
      User login status: {props.userLoggedIn ? "Logged in" : "Not logged in" }
      </div>
      <div>
      {props.userLoggedIn ?
        <GoToProtected/>
        :
        <div>
          <GoToLogin/>
          <GoToSignUp/>
        </div>
      }
      </div>
      <div>
        <View1/>
        <div className="v1-v2">
          <Visualization1/>
          <Visualization2/>
        </div>
        <div className="v3">
          <Visualization3/>
        </div>
        <View2/>
        <div className = "v4-v5">
          <Visualization4/>
          <Visualization5/>
        </div>
      </div>
    </div>
  )
}
