import React, { useState } from 'react'
import { TextInput, View, Button, StyleSheet } from 'react-native'

const DescriptionInputField = () => {
  const [description, setDescription] = useState('')

  const handleInputChange = (text) => {
    setDescription(text)
  }

  const handleSubmit = () => {
    // Handle submission of the description
    console.log('Description submitted:', description)
  }
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        numberOfLines={4}
        placeholder="Describe your complaint"
        onChangeText={handleInputChange}
        value={description}
        style={styles.input}
        placeholderTextColor={'#263238'}
      />
      {/* <Button title="Submit" onPress={handleSubmit} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderColor: '#263238',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#263238'
  }
})

export default DescriptionInputField
