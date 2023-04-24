import './Visualization.css';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Visualization4() {

  const [chinaCo2, setChinaCo2] = useState([]);
  const [indiaCo2, setIndiaCo2] = useState([]);
  const [usaCo2, setUsaCo2] = useState([]);
  const [selectedCountry1, setSelectedCountry1] = useState('');
  const [selectedCountry2, setSelectedCountry2] = useState('');
  const [selectedCountry3, setSelectedCountry3] = useState('');
  const [buttonClicks, setButtonClicks] = useState(0);
  const [dataToDisplay, setDataToDisplay] = useState([]);

  const _ = require('lodash');

  useEffect(() => {
    fetch('http://localhost:3001/v4chinaco2')
      .then(response => response.json())
      .then(chinaCo2 => setChinaCo2(chinaCo2));
  });

  useEffect(() => {
    fetch('http://localhost:3001/v4indiaco2')
      .then(response => response.json())
      .then(indiaCo2 => setIndiaCo2(indiaCo2));
  });

  useEffect(() => {
    fetch('http://localhost:3001/v4usaco2')
      .then(response => response.json())
      .then(usaCo2 => setUsaCo2(usaCo2));
  });

  const chinaCo2Data = _(chinaCo2)
    .groupBy('vuosi')
    .map((values, year) => ({
      year,
      chinaco2: _.meanBy(values, 'millionstonsco2')
    }))
    .value();

  const indiaCo2Data = _(indiaCo2)
    .groupBy('vuosi')
    .map((values, year) => ({
      year,
      indiaco2: _.meanBy(values, 'millionstonsco2')
    }))
    .value();

  const usaCo2Data = _(usaCo2)
    .groupBy('vuosi')
    .map((values, year) => ({
      year,
      usaco2: _.meanBy(values, 'millionstonsco2')
    }))
    .value();

  const handleButtonClick1 = (country) => {
    if (buttonClicks === 1) {
      setSelectedCountry1('');
    }
    setButtonClicks(buttonClicks + 1);
    if (selectedCountry1 === country) {
      setSelectedCountry1('');
      setButtonClicks(0);
    } else {
      setSelectedCountry1(country);
      setDataToDisplay(country === 'china' ? chinaCo2Data : []);
    }
  };

  const handleButtonClick2 = (country) => {
    if (buttonClicks === 1) {
      setSelectedCountry2('');
    }
    setButtonClicks(buttonClicks + 1);
    if (selectedCountry2 === country) {
      setSelectedCountry2('');
      setButtonClicks(0);
    } else {
      setSelectedCountry2(country);
      setDataToDisplay(country === 'india' ? indiaCo2Data : []);
    }
  };

  const handleButtonClick3 = (country) => {
    if (buttonClicks === 1) {
      setSelectedCountry3('');
    }
    setButtonClicks(buttonClicks + 1);
    if (selectedCountry3 === country) {
      setSelectedCountry3('');
      setButtonClicks(0);
    } else {
      setSelectedCountry3(country);
      setDataToDisplay(country === 'usa' ? usaCo2Data : []);
    }
  };


  return (
    <div className="visualization-container">
      <div className="visualization-block">
        <h1>Visualization 4</h1>
        <p>Fossil CO2 emissions of three countries over a period of time. The x-axis showing the years, while the y-axis showing values in million tonnes of CO2 emissions per year.</p>
        <a href="https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021" className="big-link">Description</a>
        <div>
          <button onClick={() => handleButtonClick1('china')}>China</button>
          <button onClick={() => handleButtonClick2('india')}>India</button>
          <button onClick={() => handleButtonClick3('usa')}>USA</button>
        </div>
        <LineChart width={800} height={400} data={dataToDisplay} style={{ backgroundColor: 'black' }}>
          <XAxis dataKey="year" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          {selectedCountry1 === 'china' && (
            <Line type="monotone" dataKey="chinaco2" stroke="#8884d8" />
          )}
          {selectedCountry2 === 'india' && (
            <Line type="monotone" dataKey="indiaco2" stroke="#82ca9d" />
          )}
          {selectedCountry3 === 'usa' && (
            <Line type="monotone" dataKey="usaco2" stroke="#ffc658" />
          )}
        </LineChart>
      </div>
    </div>
  );
}
