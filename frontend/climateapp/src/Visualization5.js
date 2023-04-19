import './Visualization.css';
import React, { useState, useEffect, PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, LabelList, Legend , Tooltip, } from 'recharts';

export default function Visualization5() {
  const _ = require('lodash');
  const [agricultureData, setAgricultureData] = useState([]);
  const [energyData, setEnergyData] = useState([]);
  const [wasteData, setWasteData] = useState([]);
  const [industrialData, setIndustrialData] = useState([]);
  const [globalData, setglobalData] = useState([]);

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


const CustomTooltip = ({ active, payload, label}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>

    );
  }
  return null;
};

  return (
    <div className='visualization-block'>
      <h1>Visualization 5</h1>
        <PieChart width={900} height={400}>
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
              key={`cell-${clicked}`} 
              fill={COLORS[clicked % COLORS.length]} 
              onClick={(e) => {

                const Energy = 0;
                const Industrial = 1;
                const Agriculture = 2;
                const Waste = 3;
                const sectors = [];

                if (clicked === Energy) {
                  for (let i = 0; i < energyData.length; i++) {
                    sectors[i] = energyData[i].sector + " " + energyData[i].globalemissionpercent + "\n"
                  }
                  alert("Energy clicked: " + sectors)
                  sectors.length=0;

                } else if (clicked === Industrial) {
                  for (let i = 0; i < industrialData.length; i++) {
                    sectors[i] = industrialData[i].sector + " " + industrialData[i].globalemissionpercent + "\n"
                  }
                  alert("Industrial clicked: " + sectors)
                  sectors.length=0;

                } else if (clicked === Agriculture) {
                  for (let i = 0; i < agricultureData.length; i++) {
                    sectors[i] = agricultureData[i].sector + " " + agricultureData[i].globalemissionpercent + "\n"
                  }
                  alert("Agriculture clicked: " + sectors)
                  sectors.length=0;

                } else if (clicked === Waste) {
                  for (let i = 0; i < wasteData.length; i++) {
                    sectors[i] = wasteData[i].sector + " " + wasteData[i].globalemissionpercent + "\n"
                  }
                  alert("Waste clicked: " + sectors)
                  sectors.length=0;
                }}
                }
                />
            ))}
          </Pie>
        </PieChart>
        </div>
    )
};
