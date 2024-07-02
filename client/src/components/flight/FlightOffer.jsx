import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, Select } from '@mui/material';
import Logo from '../../assets/img/logo.png';
import MainImg from '../../assets/img/airplane.jpg';
import Styles from '../../scss/FlightOffer.module.scss';
import CategoryBt from './CategoryBt';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';
import FlightOffterCard from './FlightOffterCard';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const ID = 'F3GgEe8qEzwbw5IGpJlAGjP9AXxRqXB8';
const SECRET = '829Gh7AN4lL1mvez';
const drawerWidth = 500;
const Counter = ({
  label,
  count,
  onIncrement,
  onDecrement,
  min,
  max,
  disableIncrement,
}) => (
  <Box
    display='flex'
    alignItems='center'
    m={1}
    width='100%'
  >
    <Typography variant='subtitle1' sx={{ width: 180 }}>
      {label}
    </Typography>
    <Button
      variant='outlined'
      onClick={onDecrement}
      disabled={count <= min}
    >
      -
    </Button>
    <Typography variant='subtitle1' sx={{ mx: 2 }}>
      {count}
    </Typography>
    <Button
      variant='outlined'
      onClick={onIncrement}
      disabled={count >= max || disableIncrement}
    >
      +
    </Button>
  </Box>
);

const FlightOffer = () => {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const totalPassengers = adults + children + infants;
  const disableIncrement = totalPassengers >= 9;
  const [value, setValue] = useState(0);
  const [direct, setDirect] = useState(false);
  const [flyClass, setFlyClass] = useState('ECONOMY');
  const [token, setToken] = useState('');
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const handleClass = (e) => {
    setFlyClass(e.target.value);
  };

  const handleFrom = (value) => {
    setFrom(value);
  };
  const handleTo = (value) => {
    setTo(value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setEndDate();
  };
  const handleDirect = () => {
    setDirect(!direct);
  };
  const getFlyToken = () => {
    axios
      .post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        `grant_type=client_credentials&client_id=${ID}&client_secret=${SECRET}`,
        {
          headers: {
            'Content-Type':
              'application/x-www-form-urlencoded',
          },
        },
      )
      .then((res) => {
        setToken(res.data.access_token);
        const token = {
          token: res.data.access_token,
          expire: Date.now() + 1799,
        };
        localStorage.setItem(
          'FLYTOKEN',
          JSON.stringify(token),
        );
      });
  };
  useEffect(() => {
    const flyToken = JSON.parse(
      localStorage.getItem('FLYTOKEN'),
    );
    if (!flyToken || flyToken.expire < Date.now()) {
      getFlyToken();
    }
  }, []);

  const searchFlight = async () => {
    setLoading(true);
    const query = {
      from: from.IATA,
      to: to.IATA,
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: endDate
        ? dayjs(endDate).format('YYYY-MM-DD')
        : '',
      adults,
      children,
      infants,
      direct,
      flyClass,
    };
    let url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${query.from}&destinationLocationCode=${query.to}&departureDate=${query.startDate}&currencyCode=KRW&adults=${query.adults}&children=${query.children}&infants=${query.infants}&nonStop=${query.direct}&max=10`;
    if (query.endDate) {
      url = url + `&returnData=${query.endDate}`;
    }
    if (query.flyClass) {
      url = url + `&travelClass=${query.flyClass}`;
    }
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setLoading(false));
  };
  const mainRender = () => {
    if (data) {
      return data.data.map((item) => (
        <FlightOffterCard key={item.key} item={item} />
      ));
    } else {
      return (
        <>
          <div className={Styles.firstRender}>
            <img src={MainImg} />
            <p className={Styles.p1}>Extravel</p>
            <p className={Styles.p2}>항공권 검색</p>
          </div>
        </>
      );
    }
  };

  const drawer = (
    <div>
      <div className={Styles.logoBox}>
        <img src={Logo} />
      </div>
      <Divider />
      <Tabs
        value={value}
        onChange={handleChange}
        variant='fullWidth'
        TabIndicatorProps={{
          sx: {
            backgroundColor: '#275963',
            color: '#275963',
          },
        }}
      >
        <Tab
          label='편도'
          sx={{
            fontWeight: 'bold',
            fontSize: value === 0 ? '1.2rem' : '1rem',
            color:
              value === 0
                ? '#275963 !important'
                : 'inherit',
          }}
        />
        <Tab
          label='왕복'
          sx={{
            fontWeight: 'bold',
            fontSize: value === 1 ? '1.2rem' : '1rem',
            color:
              value === 1
                ? '#275963 !important'
                : 'inherit',
          }}
        />
      </Tabs>
      <div className={Styles.selectbox1}>
        <CategoryBt type='출발' handler={handleFrom} />
        <ConnectingAirportsIcon
          fontSize='large'
          style={{ margin: '30px 0 5px' }}
        />
        <CategoryBt type='도착' handler={handleTo} />
      </div>
      <div className={Styles.selectbox2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='출발 날짜'
            format='YYYY-MM-DD'
            value={startDate}
            onChange={(value) => {
              setStartDate(value);
            }}
            sx={{ width: 180, marginRight: 1 }}
            disablePast
            slotProps={{
              textField: {
                size: 'small',
              },
            }}
          />
          <DatePicker
            label='도착 날짜'
            format='YYYY-MM-DD'
            value={endDate}
            disabled={!value}
            onChange={(value) => {
              setEndDate(value);
            }}
            sx={{ width: 180 }}
            slotProps={{
              textField: {
                size: 'small',
              },
            }}
            minDate={startDate}
          />
        </LocalizationProvider>
      </div>
      <div className={Styles.selectbox3}>
        <Box p={1}>
          <Counter
            label='성인 (만 12세 이상)'
            count={adults}
            onIncrement={() => setAdults(adults + 1)}
            onDecrement={() => setAdults(adults - 1)}
            min={1}
            max={9}
            disableIncrement={disableIncrement}
          />
          <Counter
            label='소아 (만 12세 미만)'
            count={children}
            onIncrement={() => setChildren(children + 1)}
            onDecrement={() => setChildren(children - 1)}
            min={0}
            max={9}
            disableIncrement={disableIncrement}
          />
          <Counter
            label='유아 (24개월 미만)'
            count={infants}
            onIncrement={() => setInfants(infants + 1)}
            onDecrement={() => setInfants(infants - 1)}
            min={0}
            max={9}
            disableIncrement={disableIncrement}
          />
          {disableIncrement && (
            <div className={Styles.disableText}>
              {' '}
              전체 탑승객은 총 9명까지 조회 가능합니다.
            </div>
          )}
          <div className={Styles.classBox}>
            <Select
              value={flyClass}
              onChange={handleClass}
              sx={{ width: 300 }}
            >
              <MenuItem value={'ECONOMY'}>일반석</MenuItem>
              <MenuItem value={'BUSINESS'}>
                비즈니스
              </MenuItem>
              <MenuItem value={'FIRST'}>퍼스트</MenuItem>
            </Select>
          </div>
        </Box>
      </div>
      <div className={Styles.selectbox4}>
        <Checkbox color='default' onClick={handleDirect} />
        <p>직항 항공편</p>
        <div className={Styles.buttonBox}>
          <Button
            variant='contained'
            size='large'
            style={{ backgroundColor: '#275963' }}
            onClick={searchFlight}
            disabled={loading}
          >
            {loading ? '검색 중...' : '항공권 검색'}
          </Button>
          {loading && (
            <CircularProgress
              size={30}
              sx={{
                color: 'white',
                position: 'absolute',
                top: '35%',
                left: '48%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </div>
      </div>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        style={{ backgroundColor: '#275963' }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            설레이는 여행의 시작
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: data ? 3 : 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <div className={Styles.mainRender}>
          {mainRender()}
        </div>
      </Box>
    </Box>
  );
};

export default FlightOffer;
