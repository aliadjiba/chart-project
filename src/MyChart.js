import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';


const dateToObj = (date) =>{
  return {
    year:date.split('-')[0],
    month:date.split('-')[1],
    day:date.split('-')[2]
  };
}
const getISO = (date) =>{
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}
const obgToDate = (obj) =>{
  return `${obj['year']}-${obj['month']}-${obj['day']}`
}
function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}
function dateCompare (dateOne, dateTwo) {
  const dates = {
    1:new Date(dateOne),
    2:new Date(dateTwo),
  }
  return dates[1]<dates[2];
}
function decrementByDay (date) {
  if (date['day']>1) {
    date['day']--;
  }else{
    if(date['month']>1){
      date['month'] --;
      date['day'] = daysInMonth(date['month'],date['year']);
    }else{
      date['year'] --;
      date['month'] =12;
      date['day'] = daysInMonth(date['month'],date['year']);
    }
}
return date;
}
function decrementByIndex (date,index) {
  for (let i = 0; i < index; i++) {
    date = decrementByDay(date);
  }
return date;
}
function genrateDate(start,end){

  if (end === undefined){
    const now = new Date();
    const date = new Date(start);
    if (date > now) {
      end = getISO(now);
      start = obgToDate(decrementByIndex(dateToObj(end),5));
    }else if(date === now){
      end = start;
      start = obgToDate(decrementByIndex(dateToObj(end),5));
    }else{
      end = getISO(now);
      start = start;
    }
  }

  if (start >= end) return [];
  let endDate = dateToObj(end);
  let dates = [obgToDate(endDate)];
  while(dateCompare(start,obgToDate(endDate))){
    endDate = decrementByDay(endDate);
    dates = [obgToDate(endDate),...dates]
  }
  return dates;
}
function genrateData(dates){
  const data = [];
  const max = 25,min=15;
  dates.map(date=>{
    data.push({
      date:date,
      scales:parseFloat((min + Math.random()*(max-min)).toFixed(2))
    })
  })
  console.log(data);
  return data;
}
const DemoLine = ({data}) => {

const config = {
    data,
    width:400,
    height:400,
    padding: 'auto',
    xField: 'date',
    yField: 'scales',
    annotations: [
      {
        type: 'regionFilter',
        start: ['min', 'median'],
        end: ['max', '0'],
        color: '#F4664A',
      },
      {
        type: 'text',
        position: ['min', 'median'],
        content: 'med',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      {
        type: 'line',
        start: ['min', 'median'],
        end: ['max', 'median'],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
      },
    ],
  };
  return <Line {...config} />;
};
function MyChart({bases}) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [data, setData] = useState([]);
  const [base, setBase] = useState('DZD');
  useEffect(() => {
    setData(genrateData(genrateDate('2022-2-1')))
  }, []);
  useEffect(() => {
    setData(genrateData(genrateDate('2022-2-1')))
  }, [base,endDate,startDate]);
  function handleStartDateChange (e){
    setStartDate(e.target.value);
  }
  function handleEndDateChange (e){
    setEndDate(e.target.value);
  }
  function handleBaseChange (e){
    setBase(e.target.value);
  }
  return (
      <div style={{height:400,width:'75%',padding:'1rem',borderRadius:'5px',margin:' 1rem auto',boxShadow:`0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)`}}>
        <label>From</label>
    <input style={{padding:'5px',margin:'1rem .5rem'}} type={'date'} value={startDate} onChange={handleStartDateChange} />
    <label>To</label>
    <input style={{padding:'5px',margin:'1rem .5rem'}} type={'date'} value={endDate} onChange={handleEndDateChange} />
    <span>
    <select style={{padding:'5px',margin:'1rem .5rem'}} name='base' value={base} onChange={handleBaseChange}>
      {bases.map((base,index)=>(
        <option key={index} value={base}>{base}</option>
      ))}
    </select>
    </span>
        <DemoLine data={data} />
      </div>
  );
}

export default MyChart