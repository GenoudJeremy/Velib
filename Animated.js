import React, {useState, useEffect} from 'react';
import { Text, View, Animated } from 'react-native';

const FadeInView = (props) => {

    const [fadeAnim] = useState(new Animated.Value(0));
    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start();
    },[])

    return (
        <Animated.View style={{...props.style, backgroundColor:'pink', flex: fadeAnim}}>

        </Animated.View>
    )

}
export default class Animate extends React.Component {
    render(){
        return (
            <View style={{flex: 1}}>
                <FadeInView>

                </FadeInView>
                <View style={{backgroundColor:'blue', flex: 1}}>
                    <Text>
                        HELLO
                    </Text>
                </View>
            </View>
        )}
}
