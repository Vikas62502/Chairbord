import React from 'react'
import { StyleSheet, View, TextInput ,   Dimensions
} from 'react-native'

const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen =width<=420;
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
    <View style={{  alignItems: 'center' ,
      marginVertical:isSmallScreen?8:10
    }}>
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
    borderWidth: isTablet?2:1,
    color: '#000000',
    width: '100%',
    fontSize: isTablet?20:16,
    borderRadius: 20, 
    height: isTablet?80:60,
    paddingHorizontal: isTablet?30: 20,
    backgroundColor: '#F3F3F3'
  }
})
