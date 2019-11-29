import React, {useEffect, useContext} from 'react';
import {Text} from 'react-native';
import { GeolocContext } from "./Geoloc";
import MapView from "react-native-maps";
import Image from "react-native-web/src/exports/Image";

export default () => {
    const position = useContext(GeolocContext)
    const pos = position.position;
    const datas = position.datas

    if (pos != null && datas != null){
        return (
        <MapView title="Map" style={{flex:1}} initialRegion={{latitude:pos.latitude, longitude: pos.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01}} >
            <MapView.Marker coordinate={{latitude:pos.latitude, longitude: pos.longitude}}/>
            { datas.map( (item, key) => (
                <MapView.Marker key={key} coordinate={{latitude :item.fields.geo[0], longitude: item.fields.geo[1]}}>
                    <Image src={'/assets/velo.png'} styles={{height:40, width:40}}/>
                </MapView.Marker>
            ))}
        </MapView>
    )} else {
        return (<Text>Wait</Text>)
    }
}
