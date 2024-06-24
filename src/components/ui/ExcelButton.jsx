import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const ExcelButton = () => {
  return (
    <>
      <Pressable
      // style={styles.excelButton}
      // onPress={() => setCreateOrderModal(true)}
      >
        <LinearGradient
          colors={['#02546D', '#142D40']}
          style={styles.excelButton}
        >
          <Text style={styles.excelButtonText}>Excel</Text>
          <Image
            source={require('../../assets/addIcon.png')}
            style={{ marginLeft: '5%' }}
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
    paddingVertical: '10%',
    paddingHorizontal: '7%',
    borderRadius: 12
  },
  excelButtonText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 19,
    color: '#FFFFFF'
  }
})

export default ExcelButton
