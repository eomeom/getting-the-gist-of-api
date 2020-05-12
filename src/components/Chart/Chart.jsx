// we're also using "hook" here so we import { useState, useEffect }
// i think we use "useState" and "useEffect ()" functions when we have to fetch data from an array inside an array?
import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
// for the 2 charts
// in order for the 'react-chartjs-2' to work, we also need the 'chart.js' wrapper to be installed
import { Line, Bar } from 'react-chartjs-2';


import styles from './Chart.module.css';

// "data" contains data for each country and "dailyData" contains global data
// destructed "data" so that we dont have to write "data.confirmed", "data.recovered", "data.deaths"
const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  // once we fetch the data, we're going to set it to the "state" using "hook"
  // useState({}): initial value should be an empty object
  // this is how useState works
  // "dailyData" is the state and the "setDailyData" will get the contents from "dailyData"
  // the "dailyData" is in an array so useState() contains an array, i.e. useState([])
  const [dailyData, setDailyData] = useState([]);

  // // is kinda similar to this, in a class base component
  // state = {
  //   dailyData: {}
  // }

  // "useEffect" accepts a "callBack"
  // useEffects with asynchronous functions are a bit hard to read, so we cant use async with useEffect i.e. useEffect = async() =>
  // so we gotta add in a new function for a synchronous object
  useEffect (() => {
    const fetchAPI = async () => {

      // this will populate the "dailyData" with the api values from "fetchDailyData()"
      setDailyData(await fetchDailyData());

      // // is the same as
      // const dailyData = await fetchDailyData();
    }

    // // // to view the "dailyData" from api
    // // // we need this dailyData to view in the "lineChart", we gotta pass it in the "datasets:[{},{}]"
    // console.log(dailyData);

    // the "callBack"
    fetchAPI();

    // [] : useEffect() will only activate if the values in the list change.
    // its an empty array, so it will activate endlessly when the values (confirmed, deaths and date) in the list change.
    // HAVE to put the array, so that the useEffect() will behave as a "componentDidMount"
  }, []);

  // We're going to have 2 different charts, so we're going to create 2 different constants for each one of them
  // A line chart for the global trends
  // We have the "dailyData" only for the global trend
  const lineChart = (
    // when the browser is initially loaded, we are not going to have any data.
    // so the line chart starts only if the "dailyData" is available
    dailyData.length // when the its an empty array, then the "dailyData.length" it self will be zero, it already acts as a "true" or "false"
      ? (
    // we can use the "Line" component from 'react-chartjs-2'
    // the only parameter that we need is "data", which contains objects
    <Line
      data={{
        // the "labels" and the "datasets" have to be in an array
        // "labels" contains all the dates from dailyData
        // "date" is destuctured and in all the destructured "date" will return the date from "dailyData"
        // { date } => date : its a "map" function of "dailyData", and will return all the dates
        labels: dailyData.map(({ date }) => date),
        // most important part
        // datasets should contain confirmed, recovered and deaths but the daily api doesn't provide the recovered
        // on more infromation about datasets properties: https://www.chartjs.org/docs/latest/charts/line.html
        datasets: [{
          label: 'Infected',
          // borderColor: '#3333ff',
          backgroundColor: 'rgba(0,0,255,0.5)',
          // fill the space below the chart
          fill: true,
          data: dailyData.map(({ confirmed }) => confirmed),
        },{
          label: 'Deaths',
          // borderColor: 'red',
          backgroundColor: 'rgba(255,0,0,0.5)',
          fill: true,
          data: dailyData.map(({ deaths }) => deaths),
        }],
      }}
    />)
    // if there are no data available then
    : null
  );

  // for debug
  console.log(confirmed, recovered, deaths);

  // // A bar chart for each specific country
  const barChart = (
    // for checking if the "confirmed" data from "data" exists
    confirmed // data.confirmed
      ? (
        // the "Bar" component from 'react-chartjs-2
        // "data" and "options" are parameters available in "Bar" component
        <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
              label: 'People',
              // background color for each one of the "labels"
              backgroundColor: [
                'rgba(0,0,255,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(255,0,0,0.5)',
              ],
              data: [
                confirmed.value, // data.confirmed,
                recovered.value, // data.recovered,
                deaths.value, // data.deaths,
              ],
            }]
          }}
          options={{
            legend: { display: false }, /* no display of legend */
            title: { display: true, text: `Current state in ${country}`},
          }}
        />)
      // if there are no data available then
      : null
  );

  return (
    <div className={styles.container}>
      {/* to show lineChart by default (when "global" is chosen) and barChart when a country is chosen */}
      {/* country ? barChart : lineChart  if there is a country, then show barChart, otherwise show lineChart */}
      {country ? barChart : lineChart}
    </div>
  )
}

export default Chart;
