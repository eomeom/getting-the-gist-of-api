// functions that could fetch data that we need
import axios from 'axios';

const url = 'https://cors-anywhere.herokuapp.com/https://covid19.mathdro.id/api/';

// // this will let us view all the data from the api
// // "export" enables us to use the "fetchData" function from other files
// export const fetchData = async () => {
//   // asynchronous functions and using the most modern way to deal with asychoronous data
//   // it deals with Promises in the same way as .then and .catch does but its much easier to both read and write
//   // "try" will be executed if the fetch is successful and otherwise it falls to "catch"
//   try {
//     const response = await axios.get(url);

//     // once you return the "response", then you can console.log in "App.js"
//     return response;

//   } catch (error) {

//   }
// }

// to only get the data that we want
// fetching confirmed, recovered, deaths, lastUpdate data
// if we're calling "fetchData()" without any parameter i.e "country", then the "country" will equal to "undefined", which is a "false" statement
// then, it will fetch the initial api i.e. 'https://covid19.mathdro.id/api/'
export const fetchData = async(country) => {

  // to make it dynamic i.e. when you click the country, it shows data of that specific country
  let changeableUrl = url;

  // but if the url is filled with country data from the "country" api,
  if(country) {

    // then we are going to change the url to "changeableUrl" i.e. ${url}/countries/${country}, and populate the country
    // the thing that we get from here is the same as the thing that we wanna get back from https://covid19.mathdro.id/api/ but for each country
    changeableUrl = `${url}/countries/${country}`

  }

  try {

    // and the "changeableUrl" that populated with "country" from country api, will get all the data that we want for each of those countries
    // i.e. the "confirmed", "recovered", "deaths", and "lastUpdate"
    const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);

    return {confirmed, recovered, deaths, lastUpdate};

    // // is the same as
    // // { data } : is a "destructuring" method
    // // the name "data" comes directly from the api
    // const { data } = await axios.get(url);

    // const modifiedData = {
      // // taking only the data that we need
      // // the "data." function is available here due to the stuctured { data } that we defined above
      // confirmed: data.confirmed,
      // recovered: data.recovered,
      // deaths: data.deaths,
      // lastUpdate: data.lastUpdate,
      // }
      // return modifiedData;

    // // Or

    // const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(url);
    // const modifiedData = {
      // confirmed: confirmed,
      // recovered: recovered,
      // deaths: deaths,
      // lastUpdate: lastUpdate,
      // }
      // return modifiedData;

    // // Or

    // const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(url);

    // const modifiedData = {
      // confirmed,
      // recovered,
      // deaths,
      // lastUpdate,
      // }
      // return modifiedData;


    } catch (error) {

      console.log(error);

    }
  }

  // fetching daily data
  // we pass in the parameter that we wanna view the data for i.e. the "country"
  export const fetchDailyData = async() => {

    try {
      // `${url}/daily` : https://covid19.mathdro.id/api/daily, careful of the ` `
      const { data } = await axios.get(`${url}/daily`);

      // the daily api gives data in array so we need to provide appropriate code to fetch the data that we need
      // "map"ping helps to fetch the data from an api that gives us data in an array ("dailyData" is in an array)
      // so "data" is mapped as "dailyData" and can use the function
      // in each one of the "dailyData" array, we're going to do an "instant" return an object, i guess not returning the name that is returing the object?
      const modifiedData = data.map((dailyData) => ({

        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,

      }))

      // // this will just show the data not return any data to "lineChart"
      // console.log(data);

      return modifiedData;
    } catch (error) {

      console.log(error);

    }
  }

  // fetching countries
  export const fetchCountries = async () => {
    try {
      const { data: { countries } } = await axios.get(`${url}/countries`);

      // for each countries, we just wanna return their "names", no "iso2" and "iso3", so we're doing the "map"ping.
      return countries.map((country) => country.name);

      // // you gotta have to call/import the "countries" somewhere to view this log and useState() and useEffect() the "countries".
      // console.log(response);

    } catch (error) {

      console.log(error);

    }
  }
