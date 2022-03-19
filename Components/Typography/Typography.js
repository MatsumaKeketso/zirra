import React from "react";
import { StyleSheet, Text, View } from 'react-native';

/**
 * 
 * @param {String} variant "header" | "subHeader" | "caption" | "bodyOne" | "bodyTwo" | "button" | "label"
 * @param {String} priority "primary" | "secondary" for "button" variant
 * @param {String} text display text
 * @returns 
 */

const Typography = ({ variant, text, priority }) => {
    switch (variant) {
        case 'header':
            return (
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={styles.header}>{text}</Text>
                </View>)
            break;
        case 'subHeader':
            return (
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={styles.subHeader}>{text}</Text>
                </View>)
            break;
        case 'caption':
            return (
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={styles.caption}>{text}</Text>
                </View>)
            break;
        case 'body1':
            return (
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={styles.bodyOne}>{text}</Text>
                </View>)
            break;
        case 'body2':
            return (
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={styles.bodyTwo}>{text}</Text>
                </View>)
            break;
        case 'button':
            return (
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={{ color: priority === 'primary' ? "#ffffff" : "#171717", ...styles.button }}>{text}</Text>
                </View>)
            break;
        case 'label':
            return (
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={styles.label}> {text} </Text>
                </View>)
            break;
        case 'logo':
            return (
                <Text style={styles.logo}> {text} </Text>
            )
            break;
    }
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginTop: 10
    },
    header: {
        width: "100%",
        overflow: "hidden",
        fontWeight: "500",
        fontStyle: "normal",
        fontFamily: "Montserrat",
        color: "#1a1a1a",
        fontSize: 36
    },
    subHeader: {
        flexShrink: 0,
        fontWeight: "700",
        fontStyle: "normal",
        fontFamily: "Montserrat",
        color: "#1a1a1a",
        fontSize: 20,
    },
    caption: {
        flexShrink: 0,
        fontWeight: "400",
        fontStyle: "normal",
        fontFamily: "Montserrat",
        color: "#828282",
        fontSize: 12,
    },
    bodyOne: {
        fontWeight: "400",
        fontStyle: "normal",
        fontFamily: "Montserrat-Regular",
        color: "#262626",
        fontSize: 14,
    },
    bodyTwo: {
        fontWeight: "900",
        fontStyle: "normal",
        fontFamily: "Montserrat-Bold",
        color: "#ffffff",
        fontSize: 16,
        textAlign: 'left',
    },
    button: {
        fontWeight: "900",
        fontStyle: "normal",
        fontFamily: "Montserrat",
        fontSize: 14,
        textTransform: "uppercase",
        textAlign: 'center'
    },
    label: {
        fontWeight: "600",
        fontStyle: "normal",
        fontFamily: "Montserrat-Medium",
        color: "#1a1a1a",
        fontSize: 14,
    },
    logo: {
        fontWeight: "900",
        fontStyle: "normal",
        fontFamily: "Montserrat",
        color: "#1a1a1a",
        fontSize: 18,
    }
})
export default Typography