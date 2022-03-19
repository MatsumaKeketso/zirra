import React from 'react'
import WebView from 'react-native-webview'
import { View, StyleSheet, Dimensions } from 'react-native'
import InputButton from '../Button/Button'
import Typography from '../Typography/Typography'

const HEIGHT = Dimensions.get('screen').height

const Hotspots = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.mapView}>

                <WebView style={{ width: '100%', flex: 1, borderTopEndRadius: 20, overflow: 'hidden' }} source={{ uri: 'https://www.lipsum.com/feed/html' }} />
                <View style={{ width: '100%', height: 70 }}>
                    <InputButton {...props} variant="primary" text="Close" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.15)'
    },
    mapView: {
        width: '100%',
        height: '90%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: "#fff",
    }
})
export default Hotspots