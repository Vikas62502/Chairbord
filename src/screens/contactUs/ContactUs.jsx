import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import DescriptionInputField from '../../components/common/DescriptionInputField'
import DocumentUploadField from '../../components/common/UploadField'

const ContactUs = () => {
  const requestTypeDropdownData = [
    { title: 'happy' },
    { title: 'sad' },
    { title: 'happy' },
    { title: 'sad' },
    { title: 'happy' },
    { title: 'sad' }
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.dropdownLabel}>Request Type</Text>
      <SelectDropdown
        data={requestTypeDropdownData}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Select your mood'}
              </Text>
            </View>
          )
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: '#D2D9DF' })
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          )
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />

      <DescriptionInputField />
      <DocumentUploadField />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '5%',
    paddingHorizontal: '5%'
  },
  dropdownLabel: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000'
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26'
  },
  dropdownButtonArrowStyle: {
    fontSize: 28
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26'
  }
})

export default ContactUs
