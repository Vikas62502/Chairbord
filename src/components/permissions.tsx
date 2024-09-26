import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import SecondaryButton from './common/SecondaryButton';

const Permissions = () => {
  const navigation = useNavigation();

  // State to manage checkbox selections
  const [locationChecked, setLocationChecked] = useState(false);
  const [cameraChecked, setCameraChecked] = useState(false);
  const [notificationChecked, setNotificationChecked] = useState(false);
  const [storageChecked, setStorageChecked] = useState(false);
  const [contactChecked, setContactChecked] = useState(false);
  const [allPermissionsGranted, setAllPermissionsGranted] = useState(false);

  // Function to request a specific permission and update its state
  const requestPermission = async (permission, setChecked) => {
    try {
      const granted = await PermissionsAndroid.request(permission);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setChecked(true);
      } else {
        setChecked(false);
        Alert.alert(
          'Permission Denied',
          'To enable this permission, go to settings and allow it.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Go to Settings', onPress: () => Linking.openSettings() },
          ]
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Function to check if the permission is already granted
  const checkPermissionStatus = async (permission, setChecked) => {
    try {
      const granted = await PermissionsAndroid.check(permission);
      setChecked(granted);
    } catch (err) {
      console.warn(err);
    }
  };

  // Function to check if all required permissions are granted
  const checkAllPermissionsGranted = () => {
    if (
      locationChecked &&
      cameraChecked &&
      storageChecked &&
      contactChecked &&
      notificationChecked
    ) {
      setAllPermissionsGranted(true);
    } else {
      setAllPermissionsGranted(false);
    }
  };

  // Use effect to check permissions status on component mount
  useEffect(() => {
    if (Platform.OS === 'android') {
      checkPermissionStatus(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        setLocationChecked
      );
      checkPermissionStatus(PermissionsAndroid.PERMISSIONS.CAMERA, setCameraChecked);
      checkPermissionStatus(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        setStorageChecked
      );
      checkPermissionStatus(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        setContactChecked
      );
      // Assume notifications are granted by default here
      setNotificationChecked(true);
    }
  }, []);

  useEffect(() => {
    checkAllPermissionsGranted();
  }, [locationChecked, cameraChecked, storageChecked, contactChecked, notificationChecked]);

  const handleGrantPermissions = () => {
    if (!allPermissionsGranted) {
      requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, setLocationChecked);
      requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA, setCameraChecked);
      requestPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, setStorageChecked);
      requestPermission(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, setContactChecked);
      // Handle notifications permission differently if needed
    } else {
      navigation.navigate('drawer');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/homeScreen/permissions.png')}
          style={styles.image}
        />
        <Text style={styles.heading}>To get started, we need your permissions:</Text>
        <View style={{ justifyContent: 'flex-start', marginVertical: 10 }}>
          <View style={styles.permissionItem}>
            <CheckBox
              value={locationChecked}
              onValueChange={() =>
                requestPermission(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  setLocationChecked
                )
              }
              tintColors={{ true: '#02546D', false: 'grey' }}
            />
            <Text style={styles.font}>Location access</Text>
          </View>

          <View style={styles.permissionItem}>
            <CheckBox
              value={cameraChecked}
              onValueChange={() =>
                requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA, setCameraChecked)
              }
              tintColors={{ true: '#02546D', false: 'grey' }}
            />
            <Text style={styles.font}>Camera access</Text>
          </View>

          <View style={styles.permissionItem}>
            <CheckBox
              value={storageChecked}
              onValueChange={() =>
                requestPermission(
                  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                  setStorageChecked
                )
              }
              tintColors={{ true: '#02546D', false: 'grey' }}
            />
            <Text style={styles.font}>Storage access</Text>
          </View>

          <View style={styles.permissionItem}>
            <CheckBox
              value={contactChecked}
              onValueChange={() =>
                requestPermission(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, setContactChecked)
              }
              tintColors={{ true: '#02546D', false: 'grey' }}
            />
            <Text style={styles.font}>Contact access</Text>
          </View>

          <View style={styles.permissionItem}>
            <CheckBox
              value={notificationChecked}
              onValueChange={() => setNotificationChecked(!notificationChecked)} // Assuming notifications are enabled by default
              tintColors={{ true: '#02546D', false: 'grey' }}
            />
            <Text style={styles.font}>Notification access</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <SecondaryButton
          onPress={handleGrantPermissions}
          title={allPermissionsGranted ? 'Start' : 'Grant Permissions'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen
    justifyContent: 'space-between', // Space between content and button
    alignItems: 'center', // Center content horizontally
  },
  content: {
    flex: 1, // Allow content to take available space
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    paddingHorizontal: 20, // Optional: Add horizontal padding for better spacing
  },
  image: {
    width: 300, // Adjust as needed
    height: 300, // Adjust as needed
  },
  heading: {
    fontSize: 28,
    color: '#03536D',
    fontWeight: '800',
    fontFamily: 'inter',
    textAlign: 'center',
    marginVertical: 10, // Add vertical margin between image and text
  },
  font: {
    fontSize: 16,
    color: '#263238',
    fontWeight: '400',
    fontFamily: 'inter',
    maxWidth: 300,
    textAlign: 'left',
    marginLeft: 10, // Add margin to create space between checkbox and text
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5, // Space between permission items
  },
  bottomContainer: {
    padding: 20, // Add padding around the button
    width: '100%',
    alignItems: 'center', // Center button horizontally
  },
});

export default Permissions;
