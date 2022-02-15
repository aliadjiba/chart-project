import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import timeSeries from './data/MOCK_DATA.json';
const DemoLine = () => {
  const [data, setData] = useState(timeSeries);
  //console.log(timeSeries);
//   const [base, setBase] = useState('EUR');
//   useEffect(() => {
//     asyncFetch();
//   }, []);
//   const asyncFetch = () => {
//     const data = localStorage.getItem('latest');
//     if (data) {
//         setData(JSON.parse(data));
//     }else{
//         fetch(`
//     http://api.exchangeratesapi.io/v1/latest?access_key=40076e59e39037c9476be5b68a66d218`)
//       .then((response) => response.json())
//       .then((json) =>{
//         localStorage.setItem('latest',JSON.stringify(json));
//         setData(json);
//       })
//       .catch((error) => {
//         console.log('fetch data failed', error);
//       });
//     }
//   };
  const config = {
    data,
    width:400,
    height:400,
    padding: 'auto',
    xField: 'Date',
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
function MyChart() {
  return (
      <div style={{height:400,width:'75%',padding:'1rem',borderRadius:'5px',margin:' 1rem auto',boxShadow:`0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)`}}>
        <DemoLine />
      </div>
  );
}

export default MyChart