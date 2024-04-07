import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DividerWithText = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>OR</Text>
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#AFACAC'
  },
  text: {
    marginHorizontal: 10,
    color: '#AFACAC',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'inter'
  }
})

export default DividerWithText
