import { View, StyleSheet, TextInput, Dimensions, TextInputProps, StyleProp, TextStyle } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const isSmallScreen = width <= 420;

interface CustomInputTextProps {
  value: string;
  placeholder: string;
  onChangeText?: any;
  secure?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  keyboardType?: TextInputProps['keyboardType'];
  isEditable?: boolean;
  borderColor?: string;
  placeholderTextColor?: string;
  style?: any;
  maxLength?: number;
}

const CustomInputText: React.FC<CustomInputTextProps> = ({
  value,
  placeholder,
  onChangeText,
  secure = false,
  inputStyle,
  keyboardType = 'default',
  isEditable,
  borderColor = '#263238',
  placeholderTextColor = '#263238',
  maxLength,
}) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <TextInput
        style={[styles.textInput, inputStyle, { borderColor: borderColor }]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'#263238'}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        editable={isEditable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#263238',
    borderWidth: isTablet ? 2 : 1,
    color: '#000000',
    width: '100%',
    fontSize: isTablet ? 20 : 16,
    borderRadius: 20,
    height: isTablet ? 80 : 60,
    paddingHorizontal: isTablet ? 30 : 20,
    backgroundColor: 'white',
  },
});

export default CustomInputText;
