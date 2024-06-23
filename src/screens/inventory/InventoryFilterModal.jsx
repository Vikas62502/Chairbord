import React, { useState } from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const InventoryFilterModal = ({ visible, onClose, onApply }) => {
  const [SelectedTag, setSelectedTag] = useState(false)

  const banks = [
    'Kotak bank',
    'State bank of India',
    'Icici bank',
    'Bank of Baroda',
    'Axis bank',
    'Dena bank',
    'Select bank'
  ]

  const status = [
    'In-stock',
    'Issued',
    'Returned',
    'Replacement',
    'Replaced',
    'Select all'
  ]
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.headingText}>Filter</Text>

          <View>
            <Text style={styles.filterType}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
              {banks.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedTag(data)}
                >
                  {SelectedTag === data ? (
                    <LinearGradient
                      colors={['#02546D', '#142D40']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.activeCapsule}
                    >
                      <Text style={styles.activeTagText}>{data}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.capsule}>
                      <Text style={styles.tagText}>{data}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.filterType}>Type</Text>
            <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
              {status.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedTag(data)}
                >
                  {SelectedTag === data ? (
                    <LinearGradient
                      colors={['#02546D', '#142D40']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.activeCapsule}
                    >
                      <Text style={styles.activeTagText}>{data}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.capsule}>
                      <Text style={styles.tagText}>{data}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Cancel All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onApply}
              style={[styles.button, styles.applyButton]}
            >
              <Text style={[styles.buttonText, styles.applyButtonText]}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: '40%',
    height: '80%',
    borderRadius: 10,
    padding: 20
  },
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
  },
  headingText: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: '#000000'
  },
  filterType: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
    marginTop: '5%',
    marginBottom: '5%'
  },
  capsule: {
    borderWidth: 0.5,
    borderColor: '#263238',
    borderRadius: 20,
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    marginVertical: '3%'
  },
  tagText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#000000',
    padding: 5
  },
  activeCapsule: {
    borderWidth: 0.5,
    borderColor: '#263238',
    borderRadius: 20,
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    marginVertical: '3%',
    backgroundColor: '#263238'
  },
  activeTagText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: 'white',
    padding: 5
  },
  buttonText: {
    color: '#263238',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center'
  }
})

export default InventoryFilterModal
