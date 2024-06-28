import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const ExcelButton = ({ title, onpressOperation }) => {
  return (
    <>
      <Pressable
        // style={styles.excelButton}
        onPress={() => onpressOperation()}
      >
        <LinearGradient
          colors={['#02546D', '#142D40']}
          style={styles.excelButton}
        >
          <Text style={styles.excelButtonText}>{title}</Text>
          <Image
            source={require('../../assets/addIcon.png')}
            // style={{ marginLeft: '5%' }}
          />
        </LinearGradient>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  excelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    borderRadius: 12,
    paddingHorizontal: '3%'
  },
  excelButtonText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    color: '#FFFFFF',
    paddingVertical: '3%'
  }
})

export default ExcelButton
