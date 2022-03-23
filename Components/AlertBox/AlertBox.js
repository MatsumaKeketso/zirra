import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import InputButton from '../Button/Button'
import Typography from '../Typography/Typography'
/**
 * 
 * @param {String} header Header 
 * @param {String} text Message
 * @param {Boolean} open Message
 * @returns 
 */
const AlertBox = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.open}
        >
            <View style={styles.container}>
                <View style={styles.main}>
                    <Typography variant="subHeader" text="Thank you for this report" />
                    <Typography variant="body1" text="Your report has been saved." />
                    <View style={{ height: 70 }}>
                        <InputButton {...props} variant="primary" text="Okay" />
                    </View>

                </View>
            </View>

        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    main: {
        width: '90%',
        height: "auto", /* 198px */

        padding: 20,
        backgroundColor: "#ffffff",
        overflow: "hidden",
        borderRadius: 20,
    }
})
export default AlertBox