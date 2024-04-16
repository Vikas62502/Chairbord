import React, { useState } from 'react'
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import DocumentPicker from 'react-native-document-picker'

const DocumentUploadField = () => {
  const [selectedFile, setSelectedFile] = useState([])

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      })
      setSelectedFile(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.uploadField}>
        <TouchableOpacity style={{ backgroundColor: 'red' }}>
          <View>
            <Text>Upload</Text>
          </View>
        </TouchableOpacity>
        <Button title="upload" onPress={selectFile} />
      </View>

      {selectedFile && (
        <View>
          <Text style={styles.selectedFile}>Selected File:</Text>
          <View style={styles.previewFileStyle}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}
            >
              <Image
                source={require('../../assets/screens/contactus/fileAttach.png')}
              />
              <Text style={styles.selectedFile}>
                {selectedFile[0]?.name || 'img=2023-WA-20221.jpg'}
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/screens/contactus/cross.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  selectedFile: {
    // marginTop: 20,
    color: 'red'
  },
  previewFileStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D3D3D3',
    width: '95%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10
  },
  uploadField: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    padding: 20,
    width: '95%'
  }
})

export default DocumentUploadField
