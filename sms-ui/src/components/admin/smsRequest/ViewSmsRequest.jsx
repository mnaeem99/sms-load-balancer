import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import SmsRequestTable from '../../layout/SmsRequestTable';
import { VIEW_REQUEST_URL } from '../../../apis/apiUrls';
import { Grid, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    height: '100%',
    marginLeft: 'auto',
    marginTop: '2%',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginTop: '20%',
    },
    background: '#F5F5F5'
  },
}));

function ViewSmsRequest() {
  const classes = useStyles();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [size, setSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [years, setYears] = useState([new Date().getFullYear()]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const getSms = useCallback(
    async (p, s) => {
      axios.get(`${VIEW_REQUEST_URL}?keyword=${searchKeyword}&page=${p}&size=${s}&year=${selectedYear}&month=${selectedMonth}`).then((users) => {
        console.log(users);
          setData(users?.data?.content);
          setTotalElements(users?.data?.totalElements);
      });
    },
    [searchKeyword, selectedMonth, selectedYear]
  );
  useEffect(() => {
    getSms(pageNumber, size);
  }, [pageNumber, size, getSms]);
  useEffect(() => {
    const yearList = createYearList();
    setYears(yearList);
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
  const months = Array.from({ length: 12 }, (_, index) => (index + 1));
  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
  };

  return (
    <>
      <Helmet>
        <title>SMS Request</title>
      </Helmet>
      <div className={classes.mainContainer}>
        <div
          style={{
            minHeight: '59vh',
            width: '100%',
            borderRadius: '0px',
            background: '#F5F5F5',
            marginTop: '2%',
            // // boxShadow: '5.29353px 0px 13.2338px rgba(0, 0, 0, 0.2)',
          }}
        >
          
          <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 className="title">SMS Requests</h2>
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
          <SmsRequestTable
              setSize={setSize}
              setSearchKeyword={setSearchKeyword}
              searchKeyword={searchKeyword}
              setPageNumber={setPageNumber}
              data={data}
              totalElements={totalElements}            
          />
        </div>
      </div>
    </>
  );
}

export default ViewSmsRequest;
