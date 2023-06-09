import './Visualization.css';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Constants from './Constants.json'

export default function Visualization3() {
  const [carbonData, setCarbonData] = useState([]);
  const [gastData, setGastData] = useState([]);
  const [eventData, setEventData] = useState([]);

  const _ = require('lodash');


  //Content fetching from database
  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/v3carbondioxide')
      .then(response => response.json())
      .then(carbonData => setCarbonData(carbonData));
  }, []);

  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/v3gastreconstruction')
      .then(response => response.json())
      .then(gastData => setGastData(gastData));
  }, []);

  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/v3events')
      .then(response => response.json())
      .then(eventData => setEventData(eventData));
  }, []);


  const carbonDataByYear = _(carbonData)
    .groupBy('vuosi')
    .map((values, year) => ({
      year,
      co2annual: _.meanBy(values, 'carbondioxide')
    }))
    .value();

  const gastDataByYear = _(gastData)
    .groupBy('vuosi')
    .map((values, year) => ({
      year,
      gastannual: _.meanBy(values, 'gast')
    }))
    .value();

  const eventDataByYear = _(eventData)
    .groupBy('vuosi')
    .map((values, year) => ({
      year,
      event: _.reduce(values, (result, value) => `${result}${value.events} `, '')
    }))
    .map((item) => ({
      ...item,
      event: item.event.trim()
    }))
    .value();
  const combinedCarbonData = carbonDataByYear.map(year => {
    const gast = gastDataByYear.find(gast => gast.year === year.year);
    const event = eventDataByYear.find(event => event.year === year.year);
    return {
      year: year.year,
      carbondioxide: year.co2annual,
      gastannual: gast?.gastannual ?? null,
      event: event?.event ?? null,
    };
  });

  return (
    <div role="data" className='visualization-block'>
      <h1>Visualization 3</h1>
      <p>Evolution of global temperature over the past two million years.</p>
      <a href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf" className="big-link">Description</a>
      <div className='visualization-container'>
        <LineChart width={800} height={400} data={combinedCarbonData} style={{ backgroundColor: 'black' }}>
          <XAxis dataKey="year" />
          <YAxis yAxisId1="left" dataKey="carbondioxide" orientation="left" />
          <YAxis yAxisId="right" dataKey="gastannual" orientation="right" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip labelStyle={{ color: 'black' }} />
          <Legend />
          <Line type="monotone" dataKey="carbondioxide" stroke="blue" dot={false} yAxisId1="left" />
          <Line type="monotone" dataKey="gastannual" stroke="red" dot={false} yAxisId="right" />
        </LineChart>
      </div>
    </div>
  );

}