import './Visualization.css';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Constants from './Constants.json'

export default function Visualization2() {
  const [yearCo2, setYearCo2] = useState([]);
  const [monthCo2, setMonthCo2] = useState([]);
  const [icecore1, setIcecore1] = useState([]);
  const [icecore2, setIcecore2] = useState([]);
  const [icecore3, setIcecore3] = useState([]);
  const [view, setView] = useState('co2');
  const _ = require('lodash'); 

  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/maunaloaco2v2annual')
      .then(response => response.json())
      .then(yearCo2 => setYearCo2(yearCo2));
  }, []);

  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/maunaloaco2v2monthly')
      .then(response => response.json())
      .then(monthCo2 => setMonthCo2(monthCo2));
  }, []);

  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/v2icecore1')
      .then(response => response.json())
      .then(icecore1 => setIcecore1(icecore1));
  }, []);

  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/v2icecore2')
      .then(response => response.json())
      .then(icecore2 => setIcecore2(icecore2));
  }, []);

  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/v2icecore3')
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
    <div role="v2" className='visualization-block'>
      <h1>Visualization 2</h1>
      <p>Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958.</p>
      <p>Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements.</p>
      <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" className="big-link">Description co2</a>
      <br></br>
      <a href="https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html" className="big-link">Description icecores</a>
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
      <div  className='visualization-container'>
        {view === 'co2' ? (
          <LineChart width={800} height={400} data={combinedData} style={{ backgroundColor: 'black' }}>
            <XAxis dataKey="year" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip   labelStyle={{ color: 'black' }} />
            <Legend />
            <Line type="monotone" dataKey="co2annual" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="co2monthly" stroke="#82ca9d" dot={false}/>
          </LineChart>
    ) : (
          <LineChart width={800} height={400} data={iceCoreData} style={{ backgroundColor: 'black' }}>
            <XAxis dataKey="year" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip   labelStyle={{ color: 'black' }} />
            <Legend />
            <Line type="monotone" dataKey="icecore1" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="icecore2" stroke="#82ca9d" dot={false}/>
            <Line type="monotone" dataKey="icecore3" stroke="#82ca9d" dot={false}/>
          </LineChart>
        )}
      </div>
    </div>
  )
}