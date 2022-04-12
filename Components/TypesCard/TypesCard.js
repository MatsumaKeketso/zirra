import React from 'react'
import { TouchableOpacity, View, Image, ImageBackground, StyleSheet } from 'react-native'
import Typography from '../Typography/Typography'
const TypesCard = (props) => {
    return (
        <TouchableOpacity {...props} activeOpacity={0.9} style={styles.container}>
            <View resizeMode='cover' style={styles.bg} source={props.bg}>
                <Image resizeMode='contain' style={styles.image} source={props.image} />
            </View>
            <View style={styles.details}>
                <Typography variant="body2" text={props.label} />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexShrink: 0,
        flex: 1,
        height: "auto", /* 174px */
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 1)",
        overflow: "hidden",
        borderRadius: 8,
        margin: 5,
        elevation: 1
    },
    bg: {
        width: '100%',
        height: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
        borderRadius: 8,
    },
    image: {
        width: 60,
        // height: 72,
    },
    details: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "rgba(0, 0, 0, 0.02)",
    }
})
export default TypesCard