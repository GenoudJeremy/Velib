import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {GeolocProvider } from './Geoloc'
import Localisation from "./Localisation";

class App extends React.Component {

  render(){
    return (
        <GeolocProvider>
          <Localisation/>
        </GeolocProvider>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
