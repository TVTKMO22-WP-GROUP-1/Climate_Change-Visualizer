import './App.css';
import React, { useState } from 'react';



  function App() {
    
  function clickMe() {

    alert("Button clicked");
  }

  function LoginButton(e) {
    e.preventDefault();
    clickMe();
      <button onClick={LoginButton}>
        Login
      </button>
  }

  function SignUpButton(e) {
    e.preventDefault();
    clickMe();
      <button onClick={SignUpButton}>
        Sign Up
      </button>
  }

  function DeleteUserButton(e) {
    e.preventDefault();
    clickMe();
      <button onClick={DeleteUserButton}>
        Delete User
      </button>
  }

  function CreateUrlButton(e){
    e.preventDefault();
    clickMe();
      <button onClick={CreateUrlButton}>
        Create Url
      </button>
  }

  function View1() {
    return (
      <div className="headline-container">
        <div className="headline-block">
          <h2>View N1</h2>
          <p>Visualizations 1-3</p>
        </div>
      </div>
    );
  }

  function View2() {
    return (
      <div className="headline-container">
        <div className="headline-block">
          <h2>View N2</h2>
          <p>Visualizations 4-5</p>
        </div>
      </div>
    );
  }


  function View3() {
    const handleClick = () => {
      alert("Button clicked");
    }

    return (
      <div className="headline-container">
        <div className="headline-block">
          <h2>View N3</h2>
          <p>User made view</p>
          <button onClick={() => handleClick("Headline 1")}>Create URL</button>
        </div>
      </div>
    );
  }



  return (
    <div className="App">
      <div>
        <h1>Climate Change Visualizer</h1>
      </div>
      <form>
        <button onClick={LoginButton}> Log in </button>
        <button onClick={SignUpButton}> Sign Up </button>
        <button onClick={DeleteUserButton}> Delete User </button>
        <div>
        <View1/>
      </div>
      <div>
        <View2/>
      </div>
      <div>
        <View3/>
      </div>
      </form>
    </div>
  );
}

export default App;

