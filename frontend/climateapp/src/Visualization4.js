import './Visualization.css';
import React, { useState, useEffect } from 'react';
import { groupBy } from 'lodash';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Visualization4() {

  const [chinaCo2, setChinaCo2] = useState([]);
  const [indiaCo2, setIndiaCo2] = useState([]);
  const [usaCo2, setUsaCo2] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('china');

  const _ = require('lodash'); 

  useEffect(() => {
    fetch('http://localhost:3001/v4chinaco2')
      .then(response => response.json())
      .then(chinaCo2 => setChinaCo2(chinaCo2));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/v4indiaco2')
      .then(response => response.json())
      .then(indiaCo2 => setIndiaCo2(indiaCo2));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/v4usaco2')
      .then(response => response.json())
      .then(usaCo2 => setUsaCo2(usaCo2));
  }, []);
/*
 // Combine data for each year into a single array
 const data = Object.entries(
  groupBy([...chinaCo2, ...indiaCo2, ...usaCo2], 'vuosi')
).map(([year, values]) => {
  const countryData = {};
  values.forEach(({ country, MillionsTonsCo2 }) => {
    countryData[country.toLowerCase()] = MillionsTonsCo2;
  });
  return {
    year: Number(year),
    ...countryData
  };
});*/

const chinaCo2Data = _(chinaCo2)
.groupBy('vuosi')
.map((values, year) => ({
  year,
  chinaCo2: _.meanBy(values, 'MillionsTonsCo2')
}))
.value();


const indiaCo2Data = _(indiaCo2)
.groupBy('vuosi')
.map((values, year) => ({
  year,
  indiaCo2: _.meanBy(values, 'MillionsTonsCo2')
}))
.value();

const usaCo2Data = _(usaCo2)
.groupBy('vuosi')
.map((values, year) => ({
  year,
  usaCo2: _.meanBy(values, 'MillionsTonsCo2')
}))
.value();

const countryData = _.mergeWith(chinaCo2Data, indiaCo2Data, usaCo2Data, (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});

  return (
    <div className="visualization-container">
      <div className="visualization-block">
        <p>YOU ARE NOW LOOKING AT VISUALIZATION 4</p>
        <div>
          <button onClick={() => setSelectedCountry('china')}>China</button>
          <button onClick={() => setSelectedCountry('india')}>India</button>
          <button onClick={() => setSelectedCountry('usa')}>USA</button>
        </div>
        <LineChart width={800} height={400} data={countryData}>
          <XAxis dataKey="year" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          {selectedCountry === 'china' && (
            <Line type="monotone" dataKey="china" stroke="#8884d8" />
          )}
          {selectedCountry === 'india' && (
            <Line type="monotone" dataKey="india" stroke="#82ca9d" />
          )}
          {selectedCountry === 'usa' && (
            <Line type="monotone" dataKey="usa" stroke="#ffc658" />
          )}
        </LineChart>
      </div>
    </div>
  )

  
}
