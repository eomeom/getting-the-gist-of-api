import React from 'react';

// // too much to import
// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

// instead just import once by creating 1 index.js file in components folder
import { Cards, Chart, CountryPicker} from '../components';
import styles from './App.module.css';
// curly braclet because it is a name (const) import
// whenever you have "index.js" files you dont need to specify the file in that folder
import { fetchData } from '../api';

// you can just "src" this as "src={coronaImg}"
import coronaImage from '../images/covid19.png';

// only the "App" part is class and the rest should be using hook
class App extends React.Component {

  // you dont have to add constructor () if you add the "state", the constructor () will immediately be constructed in the backend
  // everything that's contained in "state" will be shown if you console.log them, and can use them with "this.state" and display on screen
  state = {
    // we add things that are changing alot here, i think 
    // empty data and country which will be populated later on
    // its important to have the "country" state here in the App because we wanna pass in all the countries to all the components in App i.e. Cards, Chart and CountryPicker and get their desired data accordingly
    data: {},
    country: '',
  }

  // the componentDidMount() and handleCountryChange() contain repetitive functions so we make it reusable


  // componentDidMount () : here is where you put your request data
  // async : added for the "await" function to work, its a built in asynchrounous function in componentDidMount
  async componentDidMount () {

    // "await" : because we're dealing with asynchronous function
    // it will return data from our "fetchData ()" function
    const fetchedData = await fetchData();

    // we can populate the data in here
    // you can just write { {data} } also but with .setState, it is easier to see what we have set
    this.setState( { data: fetchedData } );

    // // to view the data we're receiving from the api
    // console.log(data);
  }

  // we are going to want to call the same fetchedData(), i.e. confirmed, recovered, deaths and lastUpdate for each countries
  // so here we wanna pass the "country"
  // we're going to pass the "handleCountryChange" method as a "prop" to the "CountryPicker" component. i.e. <CountryPicker />
  handleCountryChange = async(country) => {

    // this is why we had to set the parameter "country" in "fetchData(country)" from api/index.js
    const fetchedData = await fetchData(country);

    // // to view if the data from "country" api is fetched 
    // console.log(fetchedData);

    // setting state of country in here
    // fetching data and country for each country 
    this.setState( { data: fetchedData, country: country } );
  }

    render () {

      // destructure to use it more conveniently
      // contains all the data that we need i.e. confirmed, recovered, deaths, lastUpdated
      // "this.state" comes from "state"
      const { data, country } = this.state;


        return (
          // with the help of classnames? npm or
          // because we import "styles" from "App.module.css" file
          // className="container" becomes className={styles.container}
          <div className={styles.container}>
            <img className={styles.image} src={coronaImage} alt="COVID-19"/>
              <div className={styles.cards}>
                {/* passes in all the data that we called from "state" */}
                <Cards data={data}/>
              </div>
              <div className={styles.countryPicker}>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
              </div>
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App;
