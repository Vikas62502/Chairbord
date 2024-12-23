import EncryptedStorage from 'react-native-encrypted-storage';
import { loginSucess, logout } from '../slice/login';

export const authMiddleware = (store: any) => (next: any) => async (action: any) => {
    if (action.type === loginSucess.type) {
        const { accessToken, refreshToken } = action.payload;
        // Store tokens securely
        await EncryptedStorage.setItem('accessToken', accessToken);
        await EncryptedStorage.setItem('refreshToken', refreshToken);
    }

    if (action.type === logout.type) {
        // Remove tokens from secure storage
        await EncryptedStorage.removeItem('accessToken');
        await EncryptedStorage.removeItem('refreshToken');
    }

    return next(action);
};