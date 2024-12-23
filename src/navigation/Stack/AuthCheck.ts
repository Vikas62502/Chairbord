import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { RootState } from '../../store/store';

const AuthCheck = () => {
    const navigation = useNavigation();
    const accessToken = useSelector((state: RootState) => state.login.accessToken);
    console.log('accessToken', accessToken);
    useEffect(() => {
        if (!accessToken) {
            navigation.navigate('signin');
        }
    }, [accessToken, navigation]);

    return null; // This component does not render anything itself
};

export default AuthCheck;
