import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Button,
  styled,
  FormControlLabel,
  RadioGroup,
  Radio,
  Modal,
  Backdrop
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  LabelList,
  Label
 
} from 'recharts';
import ScreenHeading from '../../CustomComponents/ScreenHeading';
import UsersWithActivityCounts from './UserActivityCounts';


function ActivityDashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1m');
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [activityData, setActivityData] = useState([]);
  const [viewType, setViewType] = useState('count'); // 'count' or 'weight'
  const [timeBasis, setTimeBasis] = useState('activityCompleteTime'); // Default to activityCompleteTime
  const [showUserActivityCounts, setShowUserActivityCounts] = useState(false);
  const [openModal, setOpenModal] = useState(false);





  useEffect(() => {
    axios
      .get('http://dev.makellos.co.in:8080/activity/getAllActivities') // Replace with your API endpoint
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  useEffect(() => {
    let start;
    let end = new Date();

    switch (selectedTimeRange) {

      case '1w':
        start = new Date();
        start.setDate(start.getDate() - 7);
        break;

      case '1m':
        start = new Date();
        start.setMonth(start.getMonth() - 1);
        break;
      case '3m':
        start = new Date();
        start.setMonth(start.getMonth() - 3);
        break;
      case '6m':
        start = new Date();
        start.setMonth(start.getMonth() - 6);
        break;

      case '9m':
        start = new Date();
        start.setMonth(start.getMonth() - 9);
        break;
      case '1y':
        start = new Date();
        start.setFullYear(start.getFullYear() - 1);
        break;
      default:
        start = null;
    }

    setStartDate(start);
    setEndDate(end);
  }, [selectedTimeRange]);

  // useEffect(() => {
  //   const extractedYears = [...new Set(data.map((activity) => new Date(activity.activityCompleteTime).getFullYear()))];
  //   const extractedMonths = Array.from({ length: 12 }, (_, i) => i + 1); // Months 1-12
  //   const extractedWeeks = Array.from({ length: 52 }, (_, i) => i + 1); // Weeks 1-52

  //   setYears(extractedYears);
  //   setMonths(extractedMonths);
  //   setWeeks(extractedWeeks);
  // }, [data]);

  // useEffect(() => {
  //   const filtered = data.filter((activity) => {
  //     const activityDate = new Date(activity.activityCompleteTime);
  //     const activityYear = activityDate.getFullYear();
  //     const activityMonth = activityDate.getMonth() + 1; // Months are zero-based
  //     const activityWeek = Math.ceil(activityDate.getDate() / 7); // Approximate week of the month

  //     const yearMatch = selectedYear ? activityYear === selectedYear : true;
  //     const monthMatch = selectedMonth ? activityMonth === selectedMonth : true;
  //     const weekMatch = selectedWeek ? activityWeek === selectedWeek : true;

  //     if (startDate && endDate) {
  //       return (
  //         activityDate >= startDate &&
  //         activityDate <= endDate &&
  //         yearMatch &&
  //         monthMatch &&
  //         weekMatch
  //       );
  //     }

  //     return yearMatch && monthMatch && weekMatch;
  //   });

  //   setFilteredData(filtered);
  // }, [startDate, endDate, data, selectedYear, selectedMonth, selectedWeek]);

  useEffect(() => {
    const filtered = data.filter((activity) => {
      const activityDate = new Date(activity.activityCompleteTime);
      if (startDate && endDate) {
        return activityDate >= startDate && activityDate <= endDate;
      }
      return true;
    });

    setFilteredData(filtered);
  }, [startDate, endDate, data]);

  const getActivityStatusCounts = () => {
    const statusCounts = {};

    filteredData.forEach((activity) => {
      const status = activity.activityStatus;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    return Object.entries(statusCounts)
      .map(([status, count]) => ({
        status,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  };

  const getDeliveryTimeBuckets = () => {
    const timeBuckets = {
      'Morning (<12pm)': 0,
      'Afternoon (12pm-6pm)': 0,
      'Evening (>6pm)': 0,
    };

    filteredData.forEach((activity) => {
      const dateKey = timeBasis === 'activityPlaceTime' ? activity.activityPlaceTime : activity.activityCompleteTime;
      const hour = new Date(dateKey).getHours();
      if (hour < 12) {
        timeBuckets['Morning (<12pm)'] += 1;
      } else if (hour < 18) {
        timeBuckets['Afternoon (12pm-6pm)'] += 1;
      } else {
        timeBuckets['Evening (>6pm)'] += 1;
      }
    });

    return Object.entries(timeBuckets).map(([bucket, count]) => ({
      bucket,
      count,
    }));
  };




  const parseActivityConfiguration = (config) => {
    // Check if the config is undefined or not a string
    if (typeof config !== 'string' || !config) {
      console.error("Invalid configuration: ", config);
      return { weight: 0, count: 0 };
    }

    const configParts = config.split('|');
    if (configParts.length < 2) {
      console.error("Configuration format error: ", config);
      return { weight: 0, count: 0 };
    }

    const weight = parseInt(configParts[0], 10);
    const items = configParts[1].split(',');

    let count = 0;
    items.forEach((item) => {
      const itemParts = item.split('-');
      // console.log(itemParts);
      if (itemParts.length < 2) {
        console.error("Item format error: ", item);
        return;
      }
      const itemCount = parseInt(itemParts[0], 10);
      if (!isNaN(itemCount)) {
        count += itemCount;
      } else {
        console.error("Invalid item count: ", itemParts[1]);
      }
    });

    return { weight: isNaN(weight) ? 0 : weight, count };
  };



  const aggregateDataByDay = (data) => {
    const dailyTotals = {};

    data.forEach(activity => {
      const { activityConfiguration, activityCompleteTime } = activity;
      const date = new Date(activityCompleteTime).toISOString().split('T')[0]; // Format YYYY-MM-DD

      const { weight, count } = parseActivityConfiguration(activityConfiguration);

      if (!dailyTotals[date]) {
        dailyTotals[date] = { totalWeight: 0, totalCount: 0 };
      }

      dailyTotals[date].totalWeight += weight;
      dailyTotals[date].totalCount += count;
    });

    return Object.entries(dailyTotals).map(([date, totals]) => ({
      date,
      totalWeight: totals.totalWeight,
      totalCount: totals.totalCount,
    }));
  };

  const processedData = aggregateDataByDay(filteredData);

  const handleToggleChange = (event) => {
    setViewType(event.target.value);
  };

  const handleTimeBasisChange = (event) => {
    setTimeBasis(event.target.value);
  };

  const handleUniqueUsersClick = () => {
    setShowUserActivityCounts(prevState => !prevState);
  };



  const resetFilters = () => {
    let start = new Date();
    setStartDate(start.getMonth() - 1);
    setEndDate(new Date());
    setSelectedTimeRange('1m');
  };




  // Function to get the number of activities and users by addressId
  const getActivitiesAndUsersByAddressId = () => {
    const addressData = {};

    filteredData.forEach((activity) => {
      const { addressID, userID } = activity;
      if (!addressID) return; // Skip if addressId is not present

      if (!addressData[addressID]) {
        addressData[addressID] = {
          activitiesCount: 0,
          users: new Set(),
        };
      }

      addressData[addressID].activitiesCount += 1;
      addressData[addressID].users.add(userID);
    });

    return Object.entries(addressData).map(([addressID, { activitiesCount, users }]) => ({
      addressID,
      activitiesCount,
      usersCount: users.size,
    }));
  };


  // Filter data and calculate average completion time by service provider
  const getAverageCompletionTimeByServiceProvider = () => {
    const serviceProviderData = {};

    filteredData.forEach((activity) => {
      const { serviceProviderID, activityCompleteTime, activityPlaceTime } = activity;
      if (!serviceProviderID) return;

      const completeTime = new Date(activityCompleteTime).getTime();
      const placeTime = new Date(activityPlaceTime).getTime();
      const completionTimeInHours = (completeTime - placeTime) / 3600000;

      if (!serviceProviderData[serviceProviderID]) {
        serviceProviderData[serviceProviderID] = {
          totalCompletionTime: 0,
          count: 0,
        };
      }

      serviceProviderData[serviceProviderID].totalCompletionTime += completionTimeInHours;
      serviceProviderData[serviceProviderID].count += 1;
    });

    return Object.entries(serviceProviderData).map(([serviceProviderID, { totalCompletionTime, count }]) => ({
      serviceProviderID,
      avgCompletionTime: (totalCompletionTime / count).toFixed(2),
    }));
  };


  const getActivityStatusDistributionByServiceProvider = () => {
    const statusCountsByServiceProvider = {};

    filteredData.forEach((activity) => {
      const { serviceProviderID, activityStatus } = activity;
      if (!serviceProviderID) return;

      if (!statusCountsByServiceProvider[serviceProviderID]) {
        statusCountsByServiceProvider[serviceProviderID] = { completed: 0, canceled: 0 };
      }

      if (activityStatus === 'CLOTHES_DELIVERED') {
        statusCountsByServiceProvider[serviceProviderID].completed += 1;
      } else if (activityStatus === 'CANCELLED') {
        statusCountsByServiceProvider[serviceProviderID].canceled += 1;
      }
    });

    // Transform into array format
    return Object.entries(statusCountsByServiceProvider).map(([serviceProviderID, { completed, canceled }]) => ({
      serviceProviderID,
      completed,
      canceled,
    }));
  };




  const getActivityCountsOverTime = () => {
    const dateCounts = {};

    filteredData.forEach((activity) => {
      const date = new Date(activity.activityCompleteTime).toISOString().split('T')[0];
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    return Object.entries(dateCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };




  // Get unique activity statuses for legends
  const getActivityStatuses = () => {
    const statuses = new Set();
    filteredData.forEach(activity => statuses.add(activity.activityStatus));
    return Array.from(statuses);
  };



  const totalActivities = filteredData.length;

  const completionRate =
    (filteredData.filter((activity) => activity.activityStatus === 'CLOTHES_DELIVERED').length /
      totalActivities) *
    100;

  const getTotalCanceledActivities = () => {
    return filteredData.filter(activity => activity.activityStatus === 'CANCELLED').length;
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);



  const averageCompletionTime =
    filteredData.reduce((acc, activity) => {
      const completeTime = new Date(activity.activityCompleteTime).getTime();
      const placeTime = new Date(activity.activityPlaceTime).getTime();
      return acc + (completeTime - placeTime) / (1000 * 60 * 60);
    }, 0) / totalActivities || 0;

  const uniqueUsers = new Set(filteredData.map((activity) => activity.userID)).size;
  const averageActivitiesPerUser = totalActivities / uniqueUsers || 0;

  const COLORS = ['#006240', '#25D722', '#77E636', '#07a02d', '#4aa861'];
  const ResetButton = styled(Button)({
    backgroundColor: '#006240',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#004d36',
    },
  });

  const CustomLabel = () => (
    <text
      x={380} // Adjust the x value to move label to the right
      y={20} // Adjust the y value to move label down
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#000"
      fontSize={16}
    >
      Delivery Time Buckets
    </text>
  );

  return (
    <Container maxWidth={false} style={{ padding: '0 20px' }}>
      <ScreenHeading heading="Activity Dashboard" />

      <Box marginBottom={4} display="flex" justifyContent="space-between">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />

          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        {/* <FormControl variant="outlined" style={{ minWidth: 120, marginLeft: 20 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Year"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        {/* <FormControl variant="outlined" style={{ minWidth: 120, marginLeft: 20 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            label="Month"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ minWidth: 120, marginLeft: 20 }}>
          <InputLabel>Week</InputLabel>
          <Select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            label="Week"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {weeks.map((week) => (
              <MenuItem key={week} value={week}>
                {week}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <FormControl style={{ width: "500px" }}>
          <InputLabel id="time-range-label">Period</InputLabel>
          <Select
            labelId="time-range-label"
            id="time-range-select"
            value={selectedTimeRange}
            label="Time Range"
            onChange={(event) => setSelectedTimeRange(event.target.value)}
          >
            <MenuItem value="1w">Last 1 week  </MenuItem>
            <MenuItem value="1m">Last 1 month</MenuItem>
            <MenuItem value="3m">Last 3 months</MenuItem>
            <MenuItem value="6m">Last 6 months</MenuItem>
            <MenuItem value="9m">Last 9 months</MenuItem>
            <MenuItem value="1y">Last 1 year</MenuItem>
          </Select>
        </FormControl>



        <ResetButton variant="contained" onClick={resetFilters}>
          Reset Filters
        </ResetButton>
      </Box>




      <Box marginBottom={4}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={2}>
            <Paper elevation={3} style={{ padding: 20, textAlign: 'center', height: 120 }}>
              <Typography style={{ fontSize: "14px" }}>Total Activities</Typography>
              <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>{totalActivities}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6} md={2}>
            <Paper elevation={3} style={{ padding: 20, textAlign: 'center', height: 120 }}>
              <Typography style={{ fontSize: "14px" }}>Completion Rate</Typography>
              <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>{completionRate.toFixed(2)}%</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6} md={2}>
            <Paper elevation={3} style={{ padding: 20, textAlign: 'center', height: 120 }}>
              <Typography style={{ fontSize: "14px" }}>Avg Completion Time(Hrs)</Typography>
              <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>{averageCompletionTime.toFixed(2)}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6} md={2}>
            <Paper elevation={3} style={{ padding: 20, textAlign: 'center', height: 120 }}
            onClick={handleOpenModal}>
              <Typography style={{ fontSize: "14px" }}>Avg. Activities per User</Typography>
              <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>{averageActivitiesPerUser.toFixed(2)}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6} md={2}>
            <Paper elevation={3} style={{ padding: 20, textAlign: 'center', height: 120 }}>
              <Typography style={{ fontSize: "14px" }}>Total Unique Users</Typography>
              <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>{uniqueUsers}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6} md={2}>
            <Paper elevation={3} style={{ padding: 20, textAlign: 'center', height: 120 }}>
              <Typography style={{ fontSize: "14px" }}>Total Canceled Activities</Typography>
              <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>{getTotalCanceledActivities()}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      


      <Box p={2}>
        <Typography variant="h5" component="h2" gutterBottom>
          Activity Counts Over Time
        </Typography>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={getActivityCountsOverTime()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={15} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#006240" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Box p={2}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="view type"
            name="row-radio-buttons-group"
            value={viewType}
            onChange={handleToggleChange}
          >
            <FormControlLabel value="count" control={<Radio />} label="Total Count per Day" />
            <FormControlLabel value="weight" control={<Radio />} label="Total Weight per Day" />
          </RadioGroup>
        </FormControl>
        <Typography variant="h6" gutterBottom>
          {viewType === 'count' ? 'Total Count of Clothes per Day' : 'Total Weight of Clothes per Day'}
        </Typography>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey={viewType === 'count' ? 'totalCount' : 'totalWeight'}
              fill="#006240"
            >
              <LabelList dataKey={viewType === 'count' ? 'totalCount' : 'totalWeight'} position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box flex={1} marginRight={2}>



          <Typography variant="h5" component="h2" gutterBottom>
            Delivery Time Buckets
          </Typography>

          <ResponsiveContainer width="100%" height={400}>

            <FormControl component="fieldset" style={{ marginBottom: 16 }}>
              <RadioGroup
                row
                aria-label="time basis"
                name="row-radio-buttons-group-time"
                value={timeBasis}
                onChange={handleTimeBasisChange}
              >
                <FormControlLabel value="activityCompleteTime" control={<Radio />} label="Activity Complete Time" />
                <FormControlLabel value="activityPlaceTime" control={<Radio />} label="Activity Place Time" />
              </RadioGroup>
            </FormControl>


            <PieChart>
              <Pie
                data={getDeliveryTimeBuckets()}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                fill="#8884d8"
                dataKey="count"
                nameKey="bucket"
              >
                {getDeliveryTimeBuckets().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>


          <Typography variant="h5" component="h2" gutterBottom>
            Average Completion Time by Service Provider
          </Typography>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={getAverageCompletionTimeByServiceProvider()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="serviceProviderID" />
              <YAxis label={{ value: 'Avg Completion Time (hrs)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="avgCompletionTime" fill="#006240" stroke="#006240" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box flex={1} marginLeft={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Activity Count by Status
          </Typography>

          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={getActivityStatusCounts()}
                cx="50%"
                cy="50%"
                innerRadius={80} // Added for the donut hole
                outerRadius={120} // Increased size
                fill="#8884d8"
                paddingAngle={5}
                dataKey="count"
                nameKey="status"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // Custom label
                isAnimationActive={false} // Optional: disable animation for testing
              >
                {getActivityStatusCounts().map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#ffffff" // Add a white border for better distinction
                    strokeWidth={2} // Adjust stroke width
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* <Typography variant="h5" component="h2" gutterBottom>
            Number of Activities by Address ID
          </Typography>

          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={getActivitiesAndUsersByAddressId()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="addressID" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="activitiesCount" stroke="#006240" fill="#006240" />
            </AreaChart>
          </ResponsiveContainer> */}

          <Typography variant="h5" component="h2" gutterBottom>
            Activity Status Distribution by Service Provider
          </Typography>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={getActivityStatusDistributionByServiceProvider()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="serviceProviderID" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#006240" name="Clothes Delivered" />
              <Bar dataKey="canceled" fill="#25D722" name="Canceled" />
            </BarChart>
          </ResponsiveContainer>



        </Box>


        <Modal
  open={openModal}
  onClose={handleCloseModal}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{
    timeout: 500,
  }}
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    }}
  >
    <UsersWithActivityCounts data={filteredData} />
  </Box>
</Modal>


      </Box>
    </Container>
  );
}

export default ActivityDashboard;
