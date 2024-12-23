import EncryptedStorage from 'react-native-encrypted-storage';

const getToken = async () => {
    try {
        const accessToken = await EncryptedStorage.getItem('accessToken');
        return accessToken;
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
};

export default getToken;