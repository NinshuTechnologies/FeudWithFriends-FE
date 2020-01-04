import React from 'react';
import { StackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainMenu from './pages/MainMenu/MainMenu';
import SoloMode from './pages/SoloMode/SoloMode';

const AppNavigator = createStackNavigator({
    Home: {
      screen: MainMenu,
      navigationOptions: {
        header: null,
      }
    },
    SoloMode: {
        screen: SoloMode,
        navigationOptions: {
            header: null,
          }
    }
  });

export default createAppContainer(AppNavigator);