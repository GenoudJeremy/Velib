import React, {useContext} from 'react';
import {Text, Image, View, AsyncStorage} from 'react-native';
import { GeolocContext } from "./Geoloc";
import MapView from "react-native-maps";

export default () => {
    const position = useContext(GeolocContext)
    const pos = position.position;
    const datas = position.datas

    if (pos != null && datas != null){
        return (
        <MapView title="Map" style={{flex:1}} initialRegion={{latitude:pos.latitude, longitude: pos.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02}} >
            <MapView.Marker coordinate={{latitude:pos.latitude, longitude: pos.longitude}}/>
            { datas.map( (item, key) => (
                <MapView.Marker key={key} coordinate={{latitude :item.fields.geo[0], longitude: item.fields.geo[1]}}>
                    <View style={{backgroundColor: 'white', padding: 8, justifyContent: 'center' }}>
                        <Image source={require('./assets/velo.png')} styles={{height:40, width:40, justifyContent: 'center'}}/>
                        <Text>{(item.fields.nbbike+item.fields.nbebike)}/{item.fields.nbedock}</Text>
                    </View>
                </MapView.Marker>
            ))}
        </MapView>
    )} else {
        return (<Text>Wait</Text>)
    }
}
