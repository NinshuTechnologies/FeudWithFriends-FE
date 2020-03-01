/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar
} from 'react-native';
import styles from './App.css';
import AppNavigator from './Routes';
import SplashScreen from './pages/SplashScreen/SplashScreen';

const App = () => {
  return (
      <AppNavigator/>
  );
};

export default App;
