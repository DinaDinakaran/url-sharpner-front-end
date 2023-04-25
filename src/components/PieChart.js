/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = () => {
  const [result, setResult] = useState([]);

  const fetchData = async () => {
    try {
      let datas = await axios.get(
        'https://shortly-qg2a.onrender.com/api/views',
        {
          headers: {
            Authorization: window.localStorage.getItem('Authorization'),
          },
        }
      );
      setResult(datas.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  let count = result.map(({ count }) => count);
  let totalViews = result.map(({ totalViews }) => totalViews);

  if (count > 0) {
    count = count;
  } else {
    count = 1;
    totalViews = 1;
  }

  const data = {
    labels: ['Total Link', 'Views'],
    datasets: [
      {
        label: 'Revenue Sources',
        data: [count, totalViews],
        backgroundColor: ['#4E73DF', '#1CC88A'],
        borderColor: ['#FFFFFF', '#FFFFFF'],
        borderWidth: 2,
        cutout: '75%',
      },
    ],
  };

  return (
    <div className='col-xl-7 col-lg-8 mx-auto'>
      <div className='card shadow mb-4'>
        {/* <!-- Card Header - Dropdown --> */}
        <div className='card-header py-3'>
          <h6 className='m-0 text-primary text-center fw-bold fs-3'>
            Url Datas
          </h6>
        </div>
        {/* <!-- Card Body --> */}
        <div className='card-body d-flex flex-row align-items-center justify-content-center'>
          <div className=' pt-5 pb-3'>
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
