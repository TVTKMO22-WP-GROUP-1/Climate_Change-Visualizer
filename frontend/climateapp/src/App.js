import './App.css';

  function App() {

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
    const CreateUrlButton = () => {
      alert("Button clicked");
    }

    return (
      <div className="headline-container">
        <div className="headline-block">
          <div className="text-container">
          <h2>View N3</h2>
          
          <p>User made view</p>
          </div>
          <button onClick={CreateUrlButton}>Create URL</button>
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

        <form id="signupform" method="post" action="http://localhost:8080/addUser" name="SignUp">
        <label >Username:</label>
        <input id="inputUsername" type="text" name="inputUsername"></input><br></br> 
        <label >Password:</label>
        <input id="inputPassword" type="text" name="inputPassword"></input><br></br>
        <button type="submit" name="signup">Create User</button>
        <button type="submit" formaction="http://localhost:8080/login" name="login">Log in</button>
        <button type="submit" name="deleteuser" action="http://localhost:8080/deleteUser">Delete</button>
        <button type="submit" formaction="http://localhost:8080/users" formmethod="get" name="get">User Database</button>
        </form>
        
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
      </div>
      </form>
    </div>
  );
}

export default App;