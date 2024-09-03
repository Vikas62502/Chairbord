import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

// interface inputTextInterce {
//   value: string
//   placeholder: string
//   onChangeText: (text: string) => void
//   secure?: boolean
//   inputStyle?: object
//   id?: string
//   maxLength?: number
//   editable?: boolean
//   keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad'
// }

const InputText = ({
  value,
  placeholder,
  onChangeText,
  secure = false,
  inputStyle,
  id,
  maxLength,
  isEditable = true,
  keyboardType = 'default'
}) => {
  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <TextInput
        style={[styles.textInput, inputStyle]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'#263238'}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        id={id}
        maxLength={maxLength}
        editable={isEditable}
        keyboardType={keyboardType}
        // autoCapitalize="characters"
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
    width: '100%',
    fontSize: 16,
    borderRadius: 20,
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: '#F3F3F3'
  }
})
