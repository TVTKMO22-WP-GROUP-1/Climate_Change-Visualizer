import './App.css';
import React, { useState } from 'react';
import {Line, Pie} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

  function App() {

  const climateData = [
    {year: 2010, temp: 10, co2: 12},
    {year: 2011, temp: 12, co2: 14},
    {year: 2012, temp: 14, co2: 16},
    {year: 2013, temp: 15, co2: 18},
    {year: 2014, temp: 16, co2: 15},
    {year: 2015, temp: 19, co2: 15},
    {year: 2016, temp: 9, co2: 12},
    {year: 2017, temp: 5, co2: 11},
    {year: 2018, temp: 11, co2: 4},
  ]

  const [chartData, setChartData] = useState({
    labels: climateData.map((data) => data.year),
    datasets: [
      { 
        label: 'Temperature',
        data: climateData.map((data) => data.temp),
        backgroundColor: 'green'
      },
      { 
        label: 'CO2',
        data: climateData.map((data) => data.co2),
        backgroundColor: 'blue'
      }
    ]
  });

  function clickMe() {

    alert("Button clicked");
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

          <form id="form" method="post" action="http://localhost:8080/addUser" name="form">
            <label >Username:</label>
            <input id="inputUsername" type="text" name="inputUsername"></input><br></br> 
            <label >Password:</label>
            <input id="inputPassword" type="text" name="inputPassword"></input><br></br>
            <button type="submit" name="signup">Sign up</button>
            <button type="submit" formaction="http://localhost:8080/login" name="login">Log in</button>
            <button type="submit" style = {{backgroundColor :"red"}} name="deleteuser" action="http://localhost:8080/deleteUser">Delete</button>
            <button type="submit" formaction="http://localhost:8080/users" formmethod="get" name="getUsers">User Database</button>
          </form>
        
        </div>
      </div>
      <form>
        <div>
        <View1/>
        <div className="v1-v2">
        <Visualization1/>
        </div>
        <div className = "chart-container">
        <div><Line data = {chartData}/></div>
        </div>
        <div className="v1-v2">
        <Visualization2/>
        </div>
        <div className = "chart-container">
        <div><Line data = {chartData}/></div>
        </div>
        <div className="v3">
        <Visualization3/>
        </div>
        <div className = "chart-container">
        <div><Line data = {chartData}/></div>
        </div>
      </div>

      <div>
      <View2/>
        <div className="v4-v5">
        <Visualization4/>
        </div>
        <div className = "chart-container">
        <div><Line data = {chartData}/></div>
        </div>
        <div className="v4-v5">
        <Visualization5/>
        </div>
        <div className = "chart-container">
        <div><Pie data = {chartData}/></div>
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