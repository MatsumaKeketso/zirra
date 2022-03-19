import React from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import Typography from '../Components/Typography/Typography'
const ReadFeed = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.wrap}>
                <Typography variant="header" text="Read Feed" />
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FAFAFA'
    },
    wrap: {
        height: '100%',
        width: '100%',
    },
})
export default ReadFeed