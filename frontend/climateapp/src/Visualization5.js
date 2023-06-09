import './Visualization.css';
import React, { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Tooltip } from 'recharts';
import Constants from './Constants.json'

export default function Visualization5() {
  const _ = require('lodash');
  const [agricultureData, setAgricultureData] = useState([]);
  const [energyData, setEnergyData] = useState([]);
  const [wasteData, setWasteData] = useState([]);
  const [industrialData, setIndustrialData] = useState([]);
  const [globalData, setglobalData] = useState([]);
  const globalDataArray = [energyData, industrialData, agricultureData, wasteData];
  const array = [];

  //Content fetching from database
  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/v5globalagricultureforestrylanduse')
      .then(response => response.json())
      .then(agricultureData => setAgricultureData(agricultureData));
  }, []);

  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/v5globalenergy')
      .then(response => response.json())
      .then(energyData => setEnergyData(energyData));
  }, []);

  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/v5globalwaste')
      .then(response => response.json())
      .then(wasteData => setWasteData(wasteData));
  }, []);

  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/v5globalindustrial')
      .then(response => response.json())
      .then(industrialData => setIndustrialData(industrialData));
  }, []);

  useEffect(() => {
    fetch(Constants.API_ADDRESS +'/v5globalsectors')
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
          <label style={{ fontSize: '100%', color: 'white', backgroundColor: 'black' }}> {`${globalData[payload[0].name].sector}  ${payload[0].value}%: ${array}`}</label>
        </div>
      )
    }
    return null;
  };

  const renderActiveShape = props => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      midAngle
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius - 150) * cos;
    const sy = cy + (outerRadius - 150) * sin;
    return (
      <Sector
        cx={sx}
        cy={sy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="red"
      />
    );
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const onMouseOver = useCallback((data, index) => {
    setActiveIndex(index);

  }, []);

  for (let i = 0; i < globalDataArray[activeIndex]?.length; i++) {
    switch (activeIndex) {
      case 0:
        array.push(energyData[i].sector + ": " + energyData[i].globalemissionpercent + "% ");
        break;
      case 1:
        array.push(industrialData[i].sector + ": " + industrialData[i].globalemissionpercent + "% ");
        break;
      case 2:
        array.push(agricultureData[i].sector + ": " + agricultureData[i].globalemissionpercent + "% ");
        break;
      case 3:
        array.push(wasteData[i].sector + ": " + wasteData[i].globalemissionpercent + "% ");
        break;
    }
  }
  const onMouseLeave = useCallback((data, index) => {
    setActiveIndex(null);
    while (array.length > 0) {
      array.pop();
    }
  }, []);


  return (
    <div className='visualization-block'>
      <h1>Visualization 5</h1>
      <p>Co2 emission percentages based on sectors.</p>

      <p> Move your cursor on top of the sector to see more details.</p>
      <a href="https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector" className="big-link">Description</a>
      <div role="pie"  className='visualization-container'>
        <PieChart width={900} height={500}>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            activeIndex={activeIndex}
            data={globalData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={RenderCustomizedLabel}
            outerRadius={200}
            fill="#8884d8"
            dataKey="globalemissionpercent"
            activeShape={renderActiveShape}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          >
        {globalData.map((entry, clicked) => (
          <Cell
            style={{ outline: 'none' }}
            key={`cell-${clicked}`}
            fill={COLORS[clicked % COLORS.length]}
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
    </div>
  )
};




