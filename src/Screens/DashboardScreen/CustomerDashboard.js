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
import MapComponent from './MapComponent';
import UsersTable from './UsersTable';


function CustomerDashboard() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedTimeRange, setSelectedTimeRange] = useState('3m');
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
    const [selectedUserCarbonInception, setSelectedUserCarbonInception] = useState(null);
    const [selectedUserCarbonLastMonth, setSelectedUserCarbonLastMonth] = useState(null);
    const [clothesWeight, setClothesWeight] = useState(null);
    const [clothesCount, setClothesCount] = useState(null);
    const [pickupsCount, setPickupsCount] = useState(null);





    useEffect(() => {
        axios
            .get('http://34.131.81.53:8080/user/getAllUsers') // Replace with your API endpoint
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


    useEffect(() => {
        const filtered = data.filter((user) => {
            const regDate = new Date(user.registeredTime);
            if (startDate && endDate) {
                return regDate >= startDate && regDate <= endDate;
            }
            return true;
        });

        setFilteredData(filtered);
    }, [startDate, endDate, data]);






    // const aggregateDataByDay = (data) => {
    //     const dailyTotals = {};

    //     data.forEach(activity => {
    //         const { activityConfiguration, activityCompleteTime } = activity;
    //         const date = new Date(activityCompleteTime).toISOString().split('T')[0]; // Format YYYY-MM-DD

    //         const { weight, count } = parseActivityConfiguration(activityConfiguration);

    //         if (!dailyTotals[date]) {
    //             dailyTotals[date] = { totalWeight: 0, totalCount: 0 };
    //         }

    //         dailyTotals[date].totalWeight += weight;
    //         dailyTotals[date].totalCount += count;
    //     });

    //     return Object.entries(dailyTotals).map(([date, totals]) => ({
    //         date,
    //         totalWeight: totals.totalWeight,
    //         totalCount: totals.totalCount,
    //     }));
    // };

    // const processedData = aggregateDataByDay(filteredData);

    // const handleToggleChange = (event) => {
    //     setViewType(event.target.value);
    // };

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








    const getRegistrationCountsOverTime = () => {
        const dateCounts = {};

        filteredData.forEach((user) => {
            const date = new Date(user.registeredTime).toISOString().split('T')[0];
            dateCounts[date] = (dateCounts[date] || 0) + 1;
        });

        return Object.entries(dateCounts)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    };








    const uniqueUserIds = new Set(filteredData.map(user => user.userID));
    const totalUniqueUsers = uniqueUserIds.size;


    //   const completionRate =
    //     (filteredData.filter((activity) => activity.activityStatus === 'CLOTHES_DELIVERED').length /
    //       totalActivities) *
    //     100;

    // Count of Unique Active Users
    const uniqueActiveUserIds = new Set(filteredData
        .filter(user => user.userActive)
        .map(user => user.userID)
    );

    const totalUniqueActiveUsers = uniqueActiveUserIds.size;
    const uniqueNewUserIds = new Set(filteredData
        .filter(user => user.newUser)
        .map(user => user.userID)
    );

    const totalUniqueNewUsers = uniqueNewUserIds.size;


    // Handle location click on map
    const handleLocationClick = (locationData) => {
        const { userID } = locationData;

        // Format startDate and endDate to the correct API format: 'YYYY-MM-DDTHH:mm:ss'
        const formattedStartDate = startDate ? new Date(startDate).toISOString().split('.')[0] : null;
        const formattedEndDate = endDate ? new Date(endDate).toISOString().split('.')[0] : null;

        // Fetch user's carbon data by their userID
        axios
            .get(`http://dev.makellos.co.in:8080/dataReport/getUserSavedCarbonEmissionDataSinceInception/${userID}`)
            .then((response) => {
                setSelectedUserCarbonInception(response.data);
                console.log("Carbon Data Since Inception: ", response.data);
            })
            .catch((error) => console.error('Error fetching user carbon data:', error));

        axios
            .get(`http://dev.makellos.co.in:8080/dataReport/getUserSavedCarbonEmissionInLastMonthData/${userID}`)
            .then((response) => {
                setSelectedUserCarbonLastMonth(response.data);
                console.log("Carbon Data Last Month: ", response.data);
            })
            .catch((error) => console.error('Error fetching user carbon data:', error));

        // Ensure both dates are formatted before passing to the API
        if (formattedStartDate && formattedEndDate) {
            axios
                .get(`http://dev.makellos.co.in:8080/dataReport/getUserStatistics/${userID}/${formattedStartDate}/${formattedEndDate}`)
                .then((response) => {
                    setClothesWeight(response.data.data["clothesWeight"]);
                    // console.log("Clothes Weight: ", response.data.data["clothesWeight"]);
                    setClothesCount(response.data.data["clothesCount"]);
                    // console.log("Clothes Weight: ", response.data.data["clothesCount"]);
                    setPickupsCount(response.data.data["pickupsCount"]);
                    // console.log("Clothes Weight: ", response.data.data["pickupsCount"]);
                   
                })
                .catch((error) => console.error('Error fetching user statistics:', error));
        } else {
            console.error('Invalid start or end date format');
        }
    };






    const COLORS = ['#006240', '#25D722', '#77E636', '#07a02d', '#4aa861'];
    const ResetButton = styled(Button)({
        backgroundColor: '#006240',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#004d36',
        },
    });


    return (
        <Container maxWidth={false} style={{ padding: '0 20px' }}>
            <ScreenHeading heading="Customer Dashboard" />

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
                            <Typography style={{ fontSize: "14px" }}>Total Users</Typography>
                            <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>{totalUniqueUsers}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6} md={2}>
                        <Paper elevation={3} style={{ padding: 20, textAlign: 'center', height: 120 }}>
                            <Typography style={{ fontSize: "14px" }}>Total Active Users</Typography>
                            <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>{totalUniqueActiveUsers}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6} md={2}>
                        <Paper elevation={3} style={{ padding: 20, textAlign: 'center', height: 120 }}>
                            <Typography style={{ fontSize: "14px" }}>Total New Users</Typography>
                            <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>{totalUniqueNewUsers}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6} md={2}>
                        <Paper elevation={3} style={{ padding: 20, textAlign: 'center', height: 120 }}
                        >
                            <Typography style={{ fontSize: "14px" }}>Anomalies</Typography>
                            <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>{98}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6} md={2}>
                        <Paper elevation={3} style={{ padding: 20, textAlign: 'center', height: 120 }}>
                            <Typography style={{ fontSize: "14px" }}>Total Carbon</Typography>
                            <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>{67}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6} md={2}>
                        <Paper elevation={3} style={{ padding: 20, textAlign: 'center', height: 120 }}>
                            <Typography style={{ fontSize: "14px" }}>Total Weight</Typography>
                            <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>{27}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>




            <Box p={2}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Number of Registrations Over Time
                </Typography>

                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={getRegistrationCountsOverTime()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={15} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#006240" />
                    </LineChart>
                </ResponsiveContainer>
            </Box>

            <Box display="flex" justifyContent="space-between">
                <Box flex={1} marginRight={2}>
                    <Box p={2} marginBottom={4} marginTop={4}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Users Map
                        </Typography>

                        <ResponsiveContainer width="100%" height={400}>
                            <MapComponent onLocationClick={handleLocationClick} />
                        </ResponsiveContainer>
                    </Box>



                </Box>

                <Box flex={1} marginRight={2}>

                    {/* Carbon emissions bar chart */}
                    {/* Carbon emissions bar chart */}
                    {/* {selectedUserCarbonData && selectedUserCarbonData.userID && ( */}
                    <Box mt={8}>  {/* Increased the margin-top here to 8 */}
                        <Typography variant="h6">
                            {/* Carbon Emission for User {selectedUserCarbonData.userID} */}
                            User's Statistics
                        </Typography>
                        <ResponsiveContainer width="100%" height={539}>
                            <BarChart data={[
                                { name: 'Since Inception', carbon: selectedUserCarbonInception },
                                { name: 'Since Last Month', carbonLastMonth: selectedUserCarbonLastMonth },
                                { name: 'Clothes Count', ClothesWeight: clothesWeight },
                                { name: 'Clothes Count', ClothesCount: clothesCount },
                                { name: 'Pickup Count', PickupsCount: pickupsCount },

                            ]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                {/* <Legend /> */}
                                <Bar dataKey="carbon" fill="#006240" />
                                <Bar dataKey="carbonLastMonth" fill="#006240" />
                                <Bar dataKey="ClothesWeight" fill="#006240" />
                                <Bar dataKey="ClothesCount" fill="#006240" />
                                <Bar dataKey="PickupsCount" fill="#006240" />

                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                    {/* )} */}



                </Box>



            </Box>





            <Box p={2} marginBottom={4} style={{ marginTop: "80px", height: "300px" }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Users Table
                </Typography>

                <ResponsiveContainer width="100%" height={200}>
                    <UsersTable data={filteredData} />
                </ResponsiveContainer>
            </Box>
        </Container>
    );
}

export default CustomerDashboard;
