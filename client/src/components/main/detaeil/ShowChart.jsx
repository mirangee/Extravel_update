import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  CartesianGrid,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from 'recharts';
import {
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import axios from 'axios';
import CustomTooltip from './CustomTooltip';
import Styles from '../../../scss/ShowChart.module.scss';
import AuthContext from '../../../utils/AuthContext';

const ShowChart = () => {
  const [data, setData] = useState({});
  const [curRate, setCurRate] = useState(0);
  const [date, setDate] = useState('week');
  const { nation } = useContext(AuthContext);

  useEffect(() => {
    if (nation) {
      const axiosInstance = axios.create({
        baseURL: `http://localhost:8181/api/rate/${date}/showchart?nation=${nation}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      axiosInstance.get().then((res) => {
        setData(res.data);
        setCurRate(res.data[0].curRate);
      });
    }
  }, [date, nation]);

  const formatXAxis = (tickItem) => {
    return `${tickItem.substring(5).replace('-', '/')}`;
  };
  const formatYAxis = (tickItem) => {
    return `${tickItem}원`;
  };
  const labelFormatter = (tickItem) => {
    return `${tickItem.substring(0, 4)}년 ${tickItem.substring(5, 7)}월 ${tickItem.substring(8)}일`;
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  return (
    <div className={Styles.chartBox}>
      <div className={Styles.date}>
        <ToggleButtonGroup
          color='primary'
          value={date}
          exclusive
          onChange={handleDateChange}
          aria-label='Platform'
          style={{
            position: 'absolute',
            height: '35px',
            marginRight: '50px',
            marginTop: '10px',
            zIndex: '100',
          }}
        >
          <ToggleButton value='week'>1주일</ToggleButton>
          <ToggleButton value='month'>1개월</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <AreaChart
        width={700}
        height={400}
        data={data}
        margin={{
          top: 50,
          right: 200,
          bottom: 50,
          left: 0,
        }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <Area
          type='monotone'
          dataKey='averRate'
          stroke='#14505C'
          fill='#14505C'
          strokeWidth={1}
        />
        <XAxis
          dataKey='startDate'
          domain={['auto', 'auto']}
          tickLine={false}
          tickFormatter={formatXAxis}
          fontSize={10}
        />
        <YAxis
          domain={['auto', 'auto']}
          tickFormatter={formatYAxis}
          fontSize={11}
        />

        <Tooltip
          labelFormatter={labelFormatter}
          labelStyle={{
            fontSize: '12px',
            fontWeight: 'bold',
          }}
          content={<CustomTooltip curRate={curRate} />}
        />
      </AreaChart>
    </div>
  );
};

export default ShowChart;
