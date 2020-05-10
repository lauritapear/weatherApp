import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {watchDayForecast} from './store/sagas'
import {watchRestart} from './store/sagas'
import {watchRepoCommits} from './store/sagas'
import rootReducer from './store/reducers';

import App from "./App";

const muiTheme = getMuiTheme({
  'palette': {
    'accent1Color': 'rgba(191, 54, 12, 0.8)',
    'primary1Color': '#607d8b',
    'primary2Color': '#607d8b',
    'pickerHeaderColor': '#546e7a',
    'clockCircleColor': 'rgba(191, 54, 12, 0.07)'
  }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchRestart);
sagaMiddleware.run(watchDayForecast);
sagaMiddleware.run(watchRepoCommits);

ReactDOM.render(
<Provider store={store}>
  <MuiThemeProvider muiTheme={muiTheme}>
    <App/>
  </MuiThemeProvider>
</Provider>
, document.getElementById('root'));
