import React from 'react';
import { StyleSheet } from 'react-native';
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";

import {GeolocProvider } from './Geoloc'
import Localisation from "./Localisation";
import  List  from './List'
import Default_Screen from "./defaultScreen";
import {Root} from "./NavList";

class defaultScreen extends React.Component{
  render(){
    return ( <Default_Screen/>)
  }
}
class RootScreen extends React.Component{
  render(){
    return (
        <GeolocProvider>
          <Root/>
        </GeolocProvider>)
  }
}
class MapsScreen extends React.Component{
  render(){
    return(
        <GeolocProvider>
          <Localisation/>
        </GeolocProvider>
    )
  }
}
const TabNavigator = createBottomTabNavigator({
  defaultScreen: {screen: defaultScreen},
  Liste: {screen: RootScreen},
  Carte: {screen: MapsScreen},
});
export default createAppContainer(TabNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
