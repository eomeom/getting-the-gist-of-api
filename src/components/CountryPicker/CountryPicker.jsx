import React, { useState, useEffect } from 'react';
import { NativeSelect /*enable us to select the countries*/, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

// taking the "handleCountryChange" var of "country" prop here and destructure it
const CountryPicker = ({ handleCountryChange }) => {

  const [fetchedCountries, setFetchedCountries] = useState([]);
  
  useEffect(() => {
    // gotta create an asychronous function because useEffect is not, but we want it
    const fetchAPI = async () => {

      setFetchedCountries(await fetchCountries());

    }

    // calling the function, the "callBack" 
    fetchAPI();

    // the useEffect () activates only when the countries list change, so it doesnt refresh endlessly?
    // enable us to pick different countries 
  }, [setFetchedCountries]);

  // // view fetchedCountries in console
  // console.log(fetchedCountries);


  return (
    <FormControl className={styles.formControl}>
      {/* "defaultValue" : on change in the "CountryPicker", we're going to take that as the argument of that function */}
      {/* we always have a "callBack" function when we use "onChange" */}
      {/* "onChange", we wanna have the data coming from "handleCountryChange" which is coming from the "country" props */}
      <NativeSelect defaultValue="" onChange={(event) => handleCountryChange(event.target.value)}>
        {/* you can put options inside NativeSelect */}
        {/* when you choose "Global" option then the "value" gives an empty string i.e. ""
          which means, the api will give the url of 'https://covid19.mathdro.id/api/' just as we set in fetchData from api/index.js
          and get the data from that api not from 'https://covid19.mathdro.id/api/[country] */}
        <option value=''>Global</option>
        {/* we dont add every single country in option instead we fetch them using api */}
        {/* the data inside the option is the name of countries from "countries" api, the "value" states the name when you click it */}
        {/* as a react rule, we need to provide a "key" whenever we're "map"ping something in react i.e {i} */}
        {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker;