import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
const api_key = '40076e59e39037c9476be5b68a66d218';
const DemoLine = () => {
  const [data, setData] = useState([]);
  const [base, setBase] = useState('EUR');
  const [startDate, setStartDate] = useState(new Date("2020-01-01"));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    const data = localStorage.getItem(`Timeseries-euro-start-end`);
    if (data) {
        setData(JSON.parse(data));
    }else{
        fetch(`http://api.exchangeratesapi.io/v1/timeseries?access_key=${api_key}&start_date=2015-01-01&end_date=2015-02-01&base=EUR&symbols=USD,AUD,CAD,PLN,MXN&format=1`)
      .then((response) => response.json())
      .then((json) =>{
        localStorage.setItem('latest',JSON.stringify(json));
        setData(json);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
    }
  };
  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    annotations: [
      // 低于中位数颜色变化
      {
        type: 'regionFilter',
        start: ['min', 'median'],
        end: ['max', '0'],
        color: '#F4664A',
      },
      {
        type: 'text',
        position: ['min', 'median'],
        content: '中位数',
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
function Timeseries() {
  return (<DemoLine />);
}

export default Timeseries