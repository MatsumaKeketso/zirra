import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, Image, ScrollView, Modal, ActivityIndicator } from 'react-native'
import NewsCard from '../Components/NewsCard/NewsCard'
import Typography from '../Components/Typography/Typography'
import globals from './globals.styles'
const Newsfeed = (props) => {
    const [news, setNews] = useState([])
    const [openModal, setModal] = useState(true)
    const [activeRead, setActiveRead] = useState('')
    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=racism&from=2022-02-23&sortBy=publishedAt&apiKey=29b31e76ab0a43f2a429669b689dabf2').then(res => {
            res.json().then(data => {
                console.log(data)
                setNews(data.articles)
                setTimeout(() => {
                    setModal(false)
                }, 1000);
            })
        })
    }, [])
    return (
        <View style={styles.container}>
            <Modal animationType="fade"
                transparent={true}
                visible={openModal} >
                <View style={{ flex: 1, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                    <View>
                        <Typography variant="body2" text="Just a sec, getting the good stuff..." />
                    </View>

                </View>
            </Modal>
            <SafeAreaView style={styles.wrap}>
                <View style={globals.header}>
                    <View style={styles.header}>
                        <View style={{ flex: 1, height: 'auto' }}>
                            <Typography variant="header" text="Newsfeed" />
                            <View style={styles.line} />
                        </View>
                        <Image style={{ width: 44, height: 44 }} source={require("../assets/images/logo.png")} />
                    </View>
                </View>
                <View style={{ flex: 1, padding: 20, borderRadius: 20 }}>
                    <ScrollView>
                        {news.map((c, i) => {

                            return (<NewsCard onPress={() => {
                                props.navigation.navigate('ReadFeed', { url: c.url })
                            }} key={i} title={c.title} author={c.author} image={c.urlToImage} text={c.description} date={c.publishedAt} />)
                        })}

                    </ScrollView>
                </View>

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
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    line: {
        width: '50%',
        height: 4,
        backgroundColor: "#ff7433",
        borderRadius: 20
    },
})
export default Newsfeed