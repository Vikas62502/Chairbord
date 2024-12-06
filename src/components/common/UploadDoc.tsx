import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import React, { FC } from 'react';
import pickImage from '../../helper/pickImage';
import pickdoc from '../../helper/pickdoc';
import pickImageFromCamera from '../../helper/pickImageFromCamera';

interface interfaceUploadDocProps {
  text: string;
  setUploadFile: (file: any) => void;
  backgroundType?: string;
  uploadDoc?: boolean | string;
  showAlert?: boolean; // New prop to determine whether to show the alert
  defaultUploadType?: 'camera' | 'gallery' | 'doc'; // Specify default type
}

const UploadDoc: FC<interfaceUploadDocProps> = ({
  text,
  setUploadFile,
  backgroundType,
  uploadDoc = false,
  showAlert = true, // Default to showing the alert
  defaultUploadType = 'doc', // Default to using the document picker
}) => {
  const pickData = async (uploadDocType: 'camera' | 'gallery' | 'doc') => {
    try {
      let file;
      if (uploadDocType === 'camera') {
        file = await pickImageFromCamera();
      } else if (uploadDocType === 'gallery') {
        file = await pickdoc();
      } else {
        file = await pickImage();
      }

      if (file) {
        console.log('File selected:', file);
        setUploadFile(file);
      } else {
        console.warn('No file selected.');
      }
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  };

  const handlePress = () => {
    if (showAlert) {
      // Show alert if `showAlert` is true
      Alert.alert(
        'Upload Document',
        'Choose an option',
        [
          { text: 'Camera', onPress: () => pickData('camera') },
          { text: 'Gallery', onPress: () => pickData('gallery') },
        ],
        { cancelable: true }
      );
    } else {
      // Directly call the default upload type
      pickData(defaultUploadType);
    }
  };

  const getBackgroundImage = () => {
    switch (backgroundType) {
      case 'RC':
        return require('../../assets/Background/rc.webp');
      case 'FASTAG':
        return require('../../assets/Background/fastag-1.png');
      case 'Vehicle-Front':
        return require('../../assets/Background/bgremove-front.png');
      case 'Vehicle-Side':
        return require('../../assets/Background/bgremove-side.png');
      case 'Pan-Card':
        return require('../../assets/Background/pan.jpg');
      case 'Aadhar-Card':
        return require('../../assets/Background/aadhar.png');
      case 'POS':
        return require('../../assets/Background/pos.jpg');
      case 'E-Sign':
        return require('../../assets/Background/e-sign.jpg');
      default:
        return require('../../assets/uploadLogo.png');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handlePress} // Call the handler based on the prop
      >
        <ImageBackground
          source={getBackgroundImage()}
          style={styles.backgroundImage}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.overlay}>
            <View style={styles.content}>
              <Image
                source={require('../../assets/uploadLogo.png')}
                style={styles.uploadLogo}
              />
              <Text style={styles.text}>{text}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'black',
    height: 100,
    width: 'auto',
    borderWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
    width: '99%',
    height: '97%',
    margin: 1,
    borderRadius: 20,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  content: {
    alignItems: 'center',
  },
  uploadLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
  },
});

export default UploadDoc;
