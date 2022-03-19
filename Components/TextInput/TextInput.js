import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, Dimensions } from 'react-native';
import Typography from "../Typography/Typography";

/**
 * 
 * @param {String} keyboardType enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password')
 * @param {String} label placeholder / label
 * @param {Number} numberOfLines for textarea inputs
 */
const InputText = (props) => {
    const [inputHeight, setInputHeight] = useState(50)
    console.log(props)
    return (
        <View style={styles.container}>
            <Typography text={props.label} variant="label" />
            <TextInput
                {...props}
                multiline={true}
                numberOfLines={props.numberOfLines > 1 ? props.numberOfLines : 1}
                style={{ height: inputHeight, ...styles.input }}
                keyboardType="numeric"
                onContentSizeChange={e => setInputHeight(e.nativeEvent.contentSize.height)} // can help with autoheight but need to code it
            />
        </View>)
}

var styles = StyleSheet.create({
    container: {
        boxSizing: "border-box",
        flexShrink: 0,
        width: '100%', /* 330px */
        height: "auto", /* 106px */
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 10,
        overflow: "visible",
    },
    input: {
        width: '100%',
        backgroundColor: "rgb(235, 235, 235)",
        borderColor: "rgba(0, 0, 0, 0.05)",
        borderWidth: 1,
        borderRadius: 8,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
    }
})

export default InputText;