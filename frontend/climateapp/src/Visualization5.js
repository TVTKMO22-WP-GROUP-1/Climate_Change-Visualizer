import './Visualization.css';
import React, { useState, useEffect, PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, LabelList, Legend , Tooltip, Line } from 'recharts';

export default function Visualization5() {
  const _ = require('lodash');
  const [agricultureData, setAgricultureData] = useState([]);
  const [energyData, setEnergyData] = useState([]);
  const [wasteData, setWasteData] = useState([]);
  const [industrialData, setIndustrialData] = useState([]);
  const [globalData, setglobalData] = useState([]);
  const mainCategoriesArray = [energyData,industrialData,agricultureData,wasteData];
  const array = [];

  useEffect(() => {
    fetch('http://localhost:3001/v5globalagricultureforestrylanduse')
      .then(response => response.json())
      .then(agricultureData => setAgricultureData(agricultureData));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/v5globalenergy')
      .then(response => response.json())
      .then(energyData => setEnergyData(energyData));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/v5globalwaste')
      .then(response => response.json())
      .then(wasteData => setWasteData(wasteData));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/v5globalindustrial')
      .then(response => response.json())
      .then(industrialData => setIndustrialData(industrialData));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/v5globalsectors')
      .then(response => response.json())
      .then(globalData => setglobalData(globalData));
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const RADIAN = Math.PI / 180;
  const RenderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div
      className='custom-tooltip'
      >
        <label> {`${globalData[payload[0].name].sector} : ${payload[0].value}%`} </label>
      </div>
    )
  }
  return null;
};
  return (
    <div className='visualization-block'>
      <h1>Visualization 5</h1>
        <PieChart width={900} height={500}>
        <Tooltip content={<CustomTooltip />} />
          <Pie
            data={globalData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={RenderCustomizedLabel}
            outerRadius={200}
            fill="#8884d8"
            dataKey="globalemissionpercent"
          >
              {globalData.map((entry,clicked) => (
              <Cell 
              style={{outline: 'none'}}
              key={`cell-${clicked}`} 
              fill={COLORS[clicked % COLORS.length]} 
              onClick={(e) => {
                for (let i = 0; i < mainCategoriesArray[clicked].length; i++) {
                  switch (clicked) {
                    case 0:
                      array.push(energyData[i].sector + ": " + energyData[i].globalemissionpercent + "\n");
                      break;
                    case 1:
                      array.push(industrialData[i].sector + ": " + industrialData[i].globalemissionpercent + "\n");
                      break;
                    case 2:
                      array.push(agricultureData[i].sector + ": " + agricultureData[i].globalemissionpercent + "\n");
                      break;
                    case 3:
                      array.push(wasteData[i].sector + ": " + wasteData[i].globalemissionpercent + "\n");
                      break;
                  }}

                  
              alert(array)
              while (array.length > 0) {
                array.pop();
              }
              }}
                />
            ))}
          </Pie>

          <Legend
  payload={
    globalData.map(
      (item, index) => ({
        id: item.name,
        value: `${globalData[index].sector}`,
        color: COLORS[index % COLORS.length]
      })
    )
  }
/>
        </PieChart>
        </div>
    )
};
