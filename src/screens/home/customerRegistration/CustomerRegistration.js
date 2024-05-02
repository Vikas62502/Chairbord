import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import OverlayHeader from '../../../components/OverlayHeader'

const CustomerRegistration = () => {
    return (
        <SafeAreaView style={styles.container}>
            <OverlayHeader title={"Customer Registration"} navigateTo={"dashboard"} />
            <Text style={{ color: "red" }}>CustomerRegistration</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default CustomerRegistration