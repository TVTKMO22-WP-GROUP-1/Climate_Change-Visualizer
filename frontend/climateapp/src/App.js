import './App.css';

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

  function CreateUrlButton(e) {
    e.preventDefault();
    clickMe();
    <button onClick={CreateUrlButton}>
        Create URL
      </button>
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

  function Visualization1() {
    return (
      <div className="visualization-container">
        <div className="visualization-block">
          <p>Visualization 1</p>
        </div>
      </div>
    );
  }

  function Visualization2() {
    return (
      <div className="visualization-container">
        <div className="visualization-block">
          <p>Visualization 2</p>
        </div>
      </div>
    );
  }

  function Visualization3() {
    return (
      <div className="visualization-container">
        <div className="visualization-block">
          <p>Visualization 3</p>
        </div>
      </div>
    );
  }

  function Visualization4() {
    return (
      <div className="visualization-container">
        <div className="visualization-block">
          <p>Visualization 4</p>
        </div>
      </div>
    );
  }

  function Visualization5() {
    return (
      <div className="visualization-container">
        <div className="visualization-block">
          <p>Visualization 5</p>
        </div>
      </div>
    );
  }



  return (
    <div className="App">
      <div className='header'>
        <h1>Climate Change Visualizer</h1>
        <div className='header-right'>
        <button onClick={LoginButton}> Log in </button>
        <button onClick={SignUpButton}> Sign Up </button>
        <button onClick={DeleteUserButton} style = {{backgroundColor :"red"}}> Delete User </button>
        </div>
      </div>
      <form>
        <div>
        <View1/>
        <div className="v1-v2">
        <Visualization1/>
        <Visualization2/>
        </div>
        <div className="v3">
        <Visualization3/>
        </div>
      </div>
      <div>
      <View2/>
        <div className="v4-v5">
        <Visualization4/>
        <Visualization5/>
        </div>
      </div>
      <div>
        <View3/>
        <button onClick = {CreateUrlButton}> Create URL </button>
      </div>
      </form>
    </div>
  );
}

export default App;