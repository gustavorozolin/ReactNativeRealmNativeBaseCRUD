/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Navigator,
   Text,
   View,
   ToolbarAndroid,
   ActivityIndicator,
   BackAndroid
 } from 'react-native';

 import TaskList from './src/pages/task/TaskList';

 var _navigator;

 /*
   Android hardware back button. Without this, android device back button prese
   will close the app directly if you are on settings screeb without going back to
   home.
  */
 BackAndroid.addEventListener('hardwareBackPress', () => {
   if (_navigator && _navigator.getCurrentRoutes().length > 1) {
     _navigator.pop();
     return true;
   }
   return false;
 });

export default class ReactNativeRealmNativeBaseCRUD extends Component {

  render() {
    return (


      <Navigator
        initialRoute={{component: TaskList}}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          _navigator = navigator;
          if(route.component){
            // Pass the navigator the the component so it can navigate as well.
            return React.createElement(route.component, {navigator,route});
          }
      }} />
    );
  }
}



AppRegistry.registerComponent('ReactNativeRealmNativeBaseCRUD', () => ReactNativeRealmNativeBaseCRUD);
