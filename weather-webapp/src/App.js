import React, { Component } from 'react';
import {connect} from 'react-redux';
import Dock from 'react-dock';
import * as actionCreators from './store/actions/index';
import './App.css';
import { SearchForm } from './components';
import { DayTable } from './components';
import { HourTable } from './components';

const rootStyle = {
  fontSize: '14px',
  color: '#546e7a',
  height: '100vh'
}
const mainStyle = {
  width: '100%',
  height: '280%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '30vh'
}

const dockContentStyle = {
  top: '10px',
  right: '10px',
  left: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'fixed'
}

const dockStyle = {
  top: '9%',
  left: '10%'
}
// const styles = {
//   root: {
//     fontSize: '14px',
//     color: '#546e7a',
//     height: '100vh'
//   },
//   main: {
//     width: '100%',
//     height: '280%',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingTop: '30vh'
//   },
//   dockContent: {
//     top: '10px',
//     right: '10px',
//     left: '50px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     position: 'fixed'
//   },

//   remove: {
//     position: 'absolute',
//     zIndex: 1,
//     right: '10px',
//     top: '10px',
//     cursor: 'pointer'
//   },

//   title: {
//     padding: "10px 20px",
//     textAlign: "center",
//     color: "yellow",
//     fontSize: "22px"
//   },

//   theDock:{
//     top: '9%',
//     left: '10%'
//   }
// }

class App extends Component {
  render() {
    let visible = false;
    let sizeOfDock= 0.4;

    this.props.hourForecastData.length > 0
      ? visible = true
      : visible

    return (
      <div 
      style={rootStyle}
      >
        <div 
        style={mainStyle}
        >
          <SearchForm {...this.props}/>
          <DayTable {...this.props}/>

        </div>
        <Dock position='right'  size = {sizeOfDock} isVisible={visible}
          zIndex={0} dimMode='none' dockStyle={{top: '15%'}}
          >
          <div 
          style={dockStyle}
          >

            <HourTable {...this.props}/>
          </div>
        </Dock>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.dayForecastReducer.loading,
    error: state.dayForecastReducer.error,
    dayForecastData: state.dayForecastReducer.dayForecastData,

    loadingHourForecast: state.hourForecastReducer.loadingHourForecast,
    errorHourForecast: state.hourForecastReducer.errorHourForecast,
    hourForecastData: state.hourForecastReducer.hourForecastData,

    cityName: state.formReducer.cityName,
    showRepos: state.formReducer.showRepos,
    formHasBeenRestarted: state.formReducer.formHasBeenRestarted,
    dayName: state.formReducer.dayName
  };
}


export default connect(mapStateToProps, actionCreators)(App);
