import './Visualization.css';
import React, { useState, useEffect } from 'react';
import { groupBy } from 'lodash';
import { Scatter, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function Visualization3() {
  const [carbonData, setCarbonData] = useState([]);
  const[gastData, setGastData] = useState([]);
  const [eventData, setEventData] = useState([]);

  const _ = require('lodash');

  useEffect(() => {
    fetch('http://localhost:3001/v3carbondioxide')
      .then(response => response.json())
      .then(carbonData => setCarbonData(carbonData));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/v3gastreconstruction')
      .then(response => response.json())
      .then(gastData => setGastData(gastData));
      }, []);

  useEffect(() => {
    fetch('http://localhost:3001/v3events')
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

    console.log(eventDataByYear)
    
    /*const data = carbonDataByYear.map(carbon => ({
      year: carbon.year,
      carbondioxide: carbon.co2annual,
      gastannual: gastDataByYear.find(gast => gast.year === carbon.year)?.gastannual,
      event: eventDataByYear.find(event => event.year === carbon.year)?.event,
    }));
    
    console.log(data)*/

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
        <div className='visualization-block'>
          <h1>Visualization 3</h1>
          <p>Evolution of global temperature over the past two million years.</p>
          <a href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf" class="big-link">Description</a>
          <div className='visualization-container'>
            <LineChart width={800} height={400} data={combinedCarbonData} style={{ backgroundColor: 'black'}}>
            <XAxis dataKey="year" />
            <YAxis yAxisId1="left" dataKey="carbondioxide" orientation="left"  />
            <YAxis yAxisId="right" dataKey="gastannual" orientation="right" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
             <Legend />
            <Line type="monotone" dataKey="carbondioxide" stroke="blue" dot={false} yAxisId1="left" />
            <Line type="monotone" dataKey="gastannual" stroke="red" dot={false} yAxisId="right"/>
            </LineChart>
          </div>
        </div>
      );

}