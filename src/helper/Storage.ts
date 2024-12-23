import EncryptedStorage from 'react-native-encrypted-storage';

export const setCache = async (key: string, value: any) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error in saving data', error);
  }
};

export const getCache = async (key: string, defaultValue: any = null) => {
  try {
    const data = await EncryptedStorage.getItem(key);

    if (data === null || data === 'undefined') {
      return defaultValue;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error in getting data', error);
    return defaultValue;
  }
};