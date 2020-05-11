import React, { Component } from 'react';
import {connect} from 'react-redux';
import Dock from 'react-dock';
import * as actionCreators from './store/actions/index';
import './App.css';
import { SearchForm } from './components';
import { DayTable } from './components';
import { HourTable } from './components';
import { InfoCard } from './components';

const rootStyle = {
  fontSize: '14px',
  color: '#546e7a',
  height: '100vh'
}

const mainStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // justifyContent: 'center',
}

const notVisibleStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  // flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  // paddingTop: '30vh'
}

const visibleStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  marginLeft: '100px',
  marginTop: '100px',
  // paddingTop: '30vh'
}

const dockStyle = {
  top: '9%',
  left: '10%'
}

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
          style = {mainStyle}
        >
          <div style={visible ? visibleStyle : notVisibleStyle }>
            <div style={{marginRight: '30px'}}>
              <InfoCard {...this.props}/>
            </div>
            <SearchForm {...this.props}/>
          </div>
          
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
    infoCardData: state.dayForecastReducer.infoCardData,

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
