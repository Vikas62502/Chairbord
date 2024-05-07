import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

const CreateOrderModal = ({ visible, onClose, onApply }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Text>CreateOrderModal</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onClose} style={styles.button}>
          <Text style={styles.buttonText}>Cancel All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onApply}
          style={[styles.button, styles.applyButton]}
        >
          <Text style={[styles.buttonText, styles.applyButtonText]}>Apply</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto'
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#263238'
  },
  applyButton: {
    backgroundColor: '#263238',
    marginLeft: 10
  },
  applyButtonText: {
    color: 'white'
  }
})

export default CreateOrderModal
