import React from 'react';
import { useState,useEffect } from 'react';
import './App.css';
import MyChart from './MyChart';
import moment from 'moment';
const api_key = '40076e59e39037c9476be5b68a66d218';
const uri= `http://api.exchangeratesapi.io/v1/`;

function genrateData(s,e){
  const start = moment(s).add(-1, 'm');
  const today = moment(s);
  today.add(1).days()
  console.log(today);
//   const dates = []
//   let start = new Date(s);
//   const end = new Date(e);
// end.getI
//   while (end>start){
//     start.setDate(start.getDate() + 1);
//     dates.push(start);
//   }
//   console.log(dates);
//   return dates;
}


function App() {
  const date = new Date();
  const otherDate = new Date('2021-12-14');
  const [startDate, setStartDate] = useState(`${otherDate.getFullYear()}-${otherDate.getMonth()}-${otherDate.getDay()}`);
  useEffect(() => {
    asyncFetch();
  }, []);
  const [endDate, setEndDate] = useState(`${date.getFullYear()}-${(date.getMonth())}-${date.getDay()}`);
  const [base, setBase] = useState('EUR');
  const [data, setData] = useState();
  function handleStartDateChange (e){
    setStartDate(e.target.value);
  }
  function handleEndDateChange (e){
    setEndDate(e.target.value);
  }
  function handleBaseChange (e){
    setBase(e.target.value);
  }
  function handleSubmit(e){
    asyncFetch()
  }
  const asyncFetch = () => {
    const data = localStorage.getItem(`Timeseries-euro-start-end`);
    if (data) {
        setData(JSON.parse(data));
    }else{
        fetch(`${uri}latest?access_key=${api_key}`)
      .then((response) => response.json())
      .then((json) =>{
        localStorage.setItem('latest',JSON.stringify(json));
        //console.log(json);
        setData(json);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
    }
  };
  console.log(genrateData('2020-10-10','2020-10-12'));
  return (
    <div className="App">
      <MyChart />
    <input style={{padding:'5px',margin:'1rem .5rem'}} type={'date'} value={startDate} onChange={handleStartDateChange} />
    <input style={{padding:'5px',margin:'1rem .5rem'}} type={'date'} value={endDate} onChange={handleEndDateChange} />
    <select style={{padding:'5px',margin:'1rem .5rem'}} value={base} onChange={handleBaseChange}>

  {data&&Object.keys(data.rates).map((base,index)=>(
    <option key={index} value={base}>{base}</option>
  ))}
</select>
<button style={{padding:'5px',margin:'1rem .5rem'}} onClick={handleSubmit}>submit</button>

{JSON.stringify(genrateData('2020-10-10','2020-10-12'))}
    </div>
  );
}

export default App;
