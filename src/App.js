import React from 'react';
import { useState,useEffect } from 'react';
import './App.css';
import MyChart from './MyChart';
import XeChange from './XeChange';
import allBases from './data/bases'
const api_key = '40076e59e39037c9476be5b68a66d218';
const uri= `http://api.exchangeratesapi.io/v1/`;



function App() {
  const bases = Object.keys(allBases.rates);
  const [base, setBase] = useState({from:'EUR',to:'USD'});
  const [values, setValues] = useState({
    from:1, to:allBases.rates[base.to] * 1 / allBases.rates[base.from],
  });
  useEffect(() => {
    setValues(prev=>({...prev, to:allBases.rates[base.to] * prev.from / allBases.rates[base.from]}));
  }, []);
  useEffect(() => {
    setValues(prev=>({...prev, to:allBases.rates[base.to] * prev.from / allBases.rates[base.from]}));
  }, [base]);


  function handleValueChange (e){
    setValues({from:e.target.value, to:allBases.rates[base.to] * e.target.value / allBases.rates[base.from]});
  }
  function handleBaseChange (e){
    setBase(prev => ({...prev,[e.target.name]:e.target.value}));
  }
  return (
    <div className="App">
      <XeChange />
      <h1>{values.from} | {values.to}</h1>
      
  <input style={{padding:'5px',margin:'1rem .5rem'}} type={'number'} value={values.from} onChange={handleValueChange} />
    <span>
      <label>From</label>
    <select style={{padding:'5px',margin:'1rem .5rem'}} name='from' value={base.from} onChange={handleBaseChange}>
      {bases.map((base,index)=>(
        <option key={index} value={base}>{base}</option>
      ))}
    </select>
    </span>
    <span>
    <label>To</label>
    <select style={{padding:'5px',margin:'1rem .5rem'}} name='to' value={base.to} onChange={handleBaseChange}>
      {bases.map((base,index)=>(
        <option key={index} value={base}>{base}</option>
      ))}
    </select>
    </span>
  <br />
  <MyChart bases={bases} />
    </div>
  );
}

export default App;
