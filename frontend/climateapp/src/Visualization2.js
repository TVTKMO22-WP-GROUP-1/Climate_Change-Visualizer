import './Visualization.css';
import React, { useState, useEffect } from 'react';
import { groupBy } from 'lodash';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function Visualization2() {

  const [yearCo2, setYearCo2] = useState([]);
  const [monthCo2, setMonthCo2] = useState([]);
  const [icecore1, setIcecore1] = useState([]);
  const [icecore2, setIcecore2] = useState([]);
  const [icecore3, setIcecore3] = useState([]);

    const [view, setView] = useState('co2');
      
  const _ = require('lodash'); 

  useEffect(() => {
    fetch('http://localhost:3001/maunaloaco2v2annual')
      .then(response => response.json())
      .then(yearCo2 => setYearCo2(yearCo2));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/maunaloaco2v2monthly')
      .then(response => response.json())
      .then(monthCo2 => setMonthCo2(monthCo2));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/v2icecore1')
      .then(response => response.json())
      .then(icecore1 => setIcecore1(icecore1));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/v2icecore2')
      .then(response => response.json())
      .then(icecore2 => setIcecore2(icecore2));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/v2icecore3')
      .then(response => response.json())
      .then(icecore3 => setIcecore3(icecore3));
  }, []);


  const yearCo2Data = _(yearCo2)
    .groupBy('vuosi')
    .map((values, year) => ({
      year,
      co2annual: _.meanBy(values, 'average')
    }))
    .value();

  const monthCo2Data = _(monthCo2)
    .groupBy('vuosi')
    .map((values, year) => ({
      year,
      co2monthly: _.meanBy(values, 'average'),
      monthlyData: _.map(values, ({ kuukausi, average }) => ({
        month: kuukausi,
        value: average
    }))
    }))
    .value();

    const combinedData = _.mergeWith(yearCo2Data, monthCo2Data, (objValue, srcValue) => {
      if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    });

    const icecore1Data = _(icecore1)
    .groupBy('meanairage')
    .map((values, year) => ({
      year,
      icecore1: _.meanBy(values, 'co2mixingratio')
    }))
    .value();


    const icecore2Data = _(icecore2)
    .groupBy('meanairage')
    .map((values, year) => ({
      year,
      icecore2: _.meanBy(values, 'co2mixingratio')
    }))
    .value();

    const icecore3Data = _(icecore3)
    .groupBy('meanairage')
    .map((values, year) => ({
      year,
      icecore3: _.meanBy(values, 'co2mixingratio')
    }))
    .value();

    const iceCoreData = _.mergeWith(icecore1Data, icecore2Data, icecore3Data, (objValue, srcValue) => {
      if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    });



  return (
    <div>
    <h1>Visualization 2</h1>
    <div>
      <label>
        <input type="radio" value="co2" checked={view === 'co2'} onChange={() => setView('co2')} />
        co2
      </label>
      <label>
        <input type="radio" value="icecore" checked={view === 'icecore'} onChange={() => setView('icecore')} />
        icecore
      </label>
    </div>
    <br></br>
    {view === 'co2' ? (
  <div>
    <LineChart width={800} height={400} data={combinedData} style={{ backgroundColor: 'black' }}>
      <XAxis dataKey="year" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="co2annual" stroke="#8884d8" dot={false} />
      <Line type="monotone" dataKey="co2monthly" stroke="#82ca9d" dot={false}/>
    </LineChart>
  </div>
    ) : (
  <div>
    <LineChart width={800} height={400} data={iceCoreData} style={{ backgroundColor: 'black' }}>
      <XAxis dataKey="year" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="icecore1" stroke="#8884d8" dot={false} />
      <Line type="monotone" dataKey="icecore2" stroke="#82ca9d" dot={false}/>
      <Line type="monotone" dataKey="icecore3" stroke="#82ca9d" dot={false}/>
    </LineChart>
  </div>
    )}
    </div>

  )
}