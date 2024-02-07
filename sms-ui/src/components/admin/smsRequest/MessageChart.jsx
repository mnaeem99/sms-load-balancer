import { Grid, MenuItem, Select } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { MONITOR_REQUEST_URL, VIEW_REQUEST_URL } from '../../../apis/apiUrls';
import axios from 'axios';

const dummyData = [
    { date: '2022-02-01', appId: '1', messageCount: 5 },
    { date: '2022-01-01', appId: '2', messageCount: 8 },
    { date: '2022-05-01', appId: '1', messageCount: 8 },
];

const MessageChart = () => {
    const [chartData, setChartData] = useState({});
    const [years, setYears] = useState([new Date().getFullYear()]);
    const [months, setMonths] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());  
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`${MONITOR_REQUEST_URL}?year=${selectedYear}&month=${selectedMonth}`).then((users) => {
            console.log(users);
            setData(users?.data);
        });
    }, [selectedMonth, selectedYear]);
    useEffect(() => {
      if (!data || !Array.isArray(data) || data.length === 0) {
        console.log(data);
        // Handle undefined, non-array, or empty data
        setChartData({});
        return;
      }    
  
      const generateChartData = () => {
        const labels = Array.from({ length: 31 }, (_, i) => i + 1);
  
        const datasets = [...new Set(data.map((item) => item.appId))].map((appId) => {
          const messageCounts = labels.map((day) => {
            const filteredData = data.filter(
              (item) => item.appId === appId && new Date(item.date).getDate() === day
            );
            return filteredData.length > 0 ? filteredData[0].messageCount : 0;
          });
  
          return {
            label: `AppId ${appId}`,
            data: messageCounts,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            borderWidth: 1,
          };
        });
  
        return {
          labels,
          datasets,
        };
      };
  
      setChartData(generateChartData());
    }, [data]);
  
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    
    useEffect(() => {
        const yearList = createYearList();
        setYears(yearList);
        const months = Array.from({ length: 12 }, (_, index) => (index + 1));
        setMonths(months);
      }, []);
      const createYearList = () => {
        const yearList = [];
        const currentYear = new Date().getFullYear();
        for (let year = 2000; year <= currentYear; year++) {
          yearList.push(year);
        }
        return yearList;
      };
      const onChangeYear = (e) => setSelectedYear(e.target.value);
      const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setSelectedMonth(selectedMonth);
      };
  
    return (
      <div style={{height:'300px',width:'90%', margin: '5%'}}>
        <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 className="title">Monitor Requests</h2>
                <Grid item lg={3} xs={12} md={3}>
                <Select
                  name="month"
                  displayEmpty
                  className={"inputstyle"}
                  onChange={(e) => handleMonthChange(e)}
                  value={selectedMonth}
                  disableUnderline
                >
                  {months?.map((item) => {
                    return (
                      <MenuItem value={item}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span> { new Date(selectedYear, item, 0).toLocaleString('en-US', { month: 'long' })} </span>
                        </div>
                      </MenuItem>
                    );
                  })}
                </Select>
                </Grid>
                <Grid item lg={3} xs={12} md={3}>
                <Select
                  name="year"
                  displayEmpty
                  className={"inputstyle"}
                  onChange={(e) => onChangeYear(e)}
                  value={selectedYear}
                  disableUnderline
                >
                  {years?.map((item) => {
                    return (
                      <MenuItem value={item}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span> Year - {item} </span>
                        </div>
                      </MenuItem>
                    );
                  })}
                </Select>
                </Grid>
              </div>
            </Grid>
          <br />
          
        {Object.keys(chartData).length > 0 ? (
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    );
  };

export default MessageChart;
