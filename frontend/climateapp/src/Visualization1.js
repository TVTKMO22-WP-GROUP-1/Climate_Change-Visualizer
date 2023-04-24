import './Visualization.css';
import React, { useState, useEffect } from 'react';
import { groupBy } from 'lodash';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Visualization1() {
  const [yearData, setYearData] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);
  const [northYearData, setNorthYearData] = useState([]);
  const [southYearData, setSouthYearData] = useState([]);
  const [northMonthData, setNorthMonthData] = useState([]);
  const [southMonthData, setSouthMonthData] = useState([]);
  const [reconstructionData, setReconstructionData] = useState([]);


    const [showReconstruction, setShowReconstruction] = useState(false);
  
    const toggleReconstruction = () => {
      setShowReconstruction(!showReconstruction);
    }
    
    const _ = require('lodash'); 
  useEffect(() => {
    fetch('http://localhost:3001/globalv1annual')
      .then(response => response.json())
      .then(yearData => setYearData(yearData));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/globalv1monthly')
      .then(response => response.json())
      .then(dataMonth => setDataMonth(dataMonth));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/northv1annual')
      .then(response => response.json())
      .then(northYearData => setNorthYearData(northYearData));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/southv1annual')
      .then(response => response.json())
      .then(southYearData => setSouthYearData(southYearData));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/northv1monthly')
      .then(response => response.json())
      .then(northMonthData => setNorthMonthData(northMonthData));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/southv1monthly')
      .then(response => response.json())
      .then(southMonthData => setSouthMonthData(southMonthData));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/northv1reconstruction')
      .then(response => response.json())
      .then(reconstructionData => setReconstructionData(reconstructionData));
  }, []);


  const [view, setView] = useState('annual');

  const yearlyData = _(yearData)
    .groupBy('vuosi')
    .map((values, month) => ({
      month,
      anomalydegc: _.meanBy(values, 'anomalydegc')

    }))
    .value();

    const northYearlyData = _(northYearData)
    .groupBy('vuosi')
    .map((values, month) => ({
      month,
      anomalydegc: _.meanBy(values, 'anomalydegc')
    }))
    .value();

    const southYearlyData = _(southYearData)
    .groupBy('vuosi')
    .map((values, month) => ({
      month,
      anomalydegc: _.meanBy(values, 'anomalydegc')
    }))
    .value();

    
    const monthlyData = _(dataMonth)
    .groupBy('kuukausi')
    .map((values, month) => ({
      month,
      anomalydegc: _.meanBy(values, 'anomalydegc')

    }))
    .value();

    const northMonthlyData = _(northMonthData)
    .groupBy('kuukausi')
    .map((values, month) => ({
      month,
      anomalydegc: _.meanBy(values, 'anomalydegc')
    }))
    .value();

    const southMonthlyData = _(southMonthData)
    .groupBy('kuukausi')
    .map((values, month) => ({
      month,
      anomalydegc: _.meanBy(values, 'anomalydegc')
    }))
    .value();

    const recoData = _(reconstructionData)
    .groupBy('vuosi')
    .map((values, month) => ({
      month,
      reconstruction: _.meanBy(values, 'reconstruction')
    }))
    .value();

    const combinedYearlyData = yearlyData.map(year => {
      const northYear = northYearlyData.find(northYear => northYear.month === year.month);
      const southYear = southYearlyData.find(southYear => southYear.month === year.month);
      const recoYear = recoData.find(recoYear => recoYear.month === year.month);
      return {
        vuosi: year.month,
        anomalydegc: year.anomalydegc,
        anomalynorthyear: northYear ? northYear.anomalydegc : null,
        anomalysouthyear: southYear ? southYear.anomalydegc : null,
        reconstruction: recoYear ? recoYear.reconstruction : null
      };
    });

    const combinedMonthlyData = monthlyData.map(month => {
      const northMonth = northMonthlyData.find(northMonth => northMonth.month === month.month);
      const southMonth = southMonthlyData.find(southMonth => southMonth.month === month.month);
      return {
        kuukausi: month.month,
        anomalydegc: month.anomalydegc,
        anomalynorthmonth: northMonth ? northMonth.anomalydegc : null,
        anomalysouthmonth: southMonth ? southMonth.anomalydegc : null
      };
    });



return (
  <div className='visualization-block'>
    <h1>Visualization 1</h1>
    <p>Global historical surface temperature anomalies from January 1850 onwards.</p>
    <p>Northern Hemisphere 2,000-year temperature reconstruction.</p>
    <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/" className="big-link">Description Global</a>
    <br></br>
    <a href="https://bolin.su.se/data/moberg-2012-nh-1?n=moberg-2005" className="big-link">Description Reconstruction</a>
    <br></br>
    <label>
        Show Reconstruction Line
        <input type="checkbox" checked={showReconstruction} onChange={toggleReconstruction} />
      </label>
    <div>
      <label>
        <input type="radio" value="annual" checked={view === 'annual'} onChange={() => setView('annual')} />
        Annual
      </label>
      <label>
        <input type="radio" value="monthly" checked={view === 'monthly'} onChange={() => setView('monthly')} />
        Monthly
      </label>
    </div>
    {view === 'annual' ? (
  <div className='visualization-container'>
      <LineChart width={800} height={400} data={combinedYearlyData} style={{ backgroundColor: 'black' }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="vuosi" />
        <YAxis />
        <Tooltip   labelStyle={{ color: 'black' }} />
        <Legend />
       {!showReconstruction && <Line type="monotone" dataKey="anomalydegc" stroke="green" dot={false} />}
        {!showReconstruction && <Line type="monotone" dataKey="anomalynorthyear" stroke="blue" dot={false} />}
        {!showReconstruction && <Line type="monotone" dataKey="anomalysouthyear" stroke="red" dot={false}/>}
        {showReconstruction && <Line type="monotone" dataKey="reconstruction" stroke="white" dot={false} />}
      </LineChart>
  </div>
    ) : (
        <LineChart width={800} height={400} data={combinedMonthlyData} style={{ backgroundColor: 'black'}}>
         <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="kuukausi" />
         <YAxis />
         <Tooltip   labelStyle={{ color: 'black' }} />
          <Legend />
          <Line type="monotone" dataKey="anomalydegc" stroke="green" dot={false} />
          <Line type="monotone" dataKey="anomalynorthmonth" stroke="blue" dot={false}  />
          <Line type="monotone" dataKey="anomalysouthmonth" stroke="red" dot={false} />
       </LineChart>
    )}
  </div>
);
    }