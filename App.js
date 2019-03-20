import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import reducers from './reducers';
import axiosMiddleware from './lib/axios';
// import AppContainer from './containers/Dashboard/AppContainer';
import Routes from './router';
import {Root} from 'native-base';

// const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});

const store = createStore(
	combineReducers({ ...reducers }),
	applyMiddleware(axiosMiddleware),
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Root>
      <Routes/>
      </Root>
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
