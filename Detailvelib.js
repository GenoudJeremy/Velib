import {useNavigationParam} from "react-navigation-hooks";
import {View, Text, Dimensions} from 'react-native';
import MapView, {Marker} from "react-native-maps";
import React from "react";

export default Detailvelib = () => {
    const station = useNavigationParam('info')
    console.log(station)
    return (
        <View>
            <MapView
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height * 0.4,
                }}
                provider={'google'}
                region={{
                    latitude: station.geo[0],
                    longitude: station.geo[1],
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation={true}>

                <Marker coordinate={{
                    latitude: station.geo[0],
                    longitude: station.geo[1],
                }}
                        title={station.station_name}
                        key={station.recordid}
                />
            </MapView>
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{station.station_name}</Text>
                <Text style={styles.bike}>Nombre de vélo disponible : {station.nbbike}</Text>
                <Text style={styles.bike}>Nombre de vélo électrique disponible : {station.nbebike}</Text>
            </View>
            <View style={{ flex: 1 }} />
        </View>
    );
}
const styles = {
    name: {
        padding: 8,
        color: 'green',
        fontSize: 24,
        textAlign: 'center',
    },
    bike: {
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
    }
}
