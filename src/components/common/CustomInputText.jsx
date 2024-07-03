import { View, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const CustomInputText = ({
  value,
  placeholder,
  onChangeText,
  secure = false,
  inputStyle,
  keyboardType = 'default',
  isEditable
}) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <TextInput
        style={[styles.textInput, inputStyle]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'#263238'}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        editable={isEditable}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#263238',
    borderWidth: 0.5,
    color: '#000000',
    width: '100%',
    fontSize: 16,
    borderRadius: 20,
    height: 60,
    paddingHorizontal: 15
    // backgroundColor: '#F3F3F3'
  }
})

export default CustomInputText
