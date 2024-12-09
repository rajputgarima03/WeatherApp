/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from "react-redux";
import store from './redux/store'
import Routes from './Routes';


const App = () =>{
  return(
  
    <Provider store={store}>
    <Routes/>
   </Provider>
  )
}



export default App;
