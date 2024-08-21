import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

const InputText = ({
  value,
  placeholder,
  onChangeText,
  secure = false,
  inputStyle,
  id,
  maxLength,
  editable = true
}) => {
  return (
    <View style={{ marginTop: '5%', alignItems: 'center' }}>
      <TextInput
        style={[styles.textInput, inputStyle]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'#263238'}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        id={id}
        maxLength={maxLength}
        editable={editable}
      />
    </View>
  )
}

export default InputText

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#263238',
    borderWidth: 1,
    color: '#000000',
    width: '90%',
    fontSize: 16,
    borderRadius: 20,
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: '#F3F3F3'
  }
})
