import React from 'react';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';

import { Card, CardContent, Typography, Grid } from '@material-ui/core';

// destructuring all the contents in the "data" from api 
// first destructing of data and then the destructing of all the contents i.e.) {confirmed, recovered, deaths, lastUpdate }
const Cards = ({ data : {confirmed, recovered, deaths, lastUpdate }} ) => {

  // to debug
  console.log(confirmed);

  // to define confirmed,recovered, deaths and lastUpdate
  // if there are not "confirmed"
  if(!confirmed) {
    return 'Loading...';
  }
  
  return (
    <div className={styles.container}>
      {/* Grid from @material-ui */}
      <Grid container spacing={4} justify="center">
        {/* Card from @material-ui */}
        {/* Card component will be our Grid, will give the card a paper-like look */}
        {/* "xs = {12}" : came from @material-ui which let the card takes all the width of mobile screen, kinda like in bootstrap class="col-xs-12" */}
        {/* Each Cards will have different styles */}
        {/* "cx" comes from "classname" component, that helps us to add multiple styles classes at once */}
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
          <CardContent>
            {/* "Typography" material ui is used for texts, it can be a styled paragraph, heading etc... */}
            {/* "gutter" provides padding */}
            <Typography color="textSecondary" gutterBottom >Infected</Typography>
            {/* getting the data and the date from api */}
            {/* "value" is the value from "confirmed" from "data" api */}
            <Typography variant="h5">
              {/* adding the "CountUp" component that gives us animation */}
              <CountUp /*default settings you can modify*/ start={0} end={confirmed.value} duration={2.5}/*to specify how you wanna separate the numbers*/ separator=","/>
            </Typography>
            {/* if we only add {lastUpdate}, this gives us weird timestamp */}
            {/* the "new Date().toDateString()" object helps it to give a better readable date */}
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Number of Active Cases</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Recovered</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={recovered.value} duration={2.0} separator="," />
            </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Number of Recoveries</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Deaths</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={deaths.value} duration={1.7} separator="," />
            </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Number of Deaths</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cards;