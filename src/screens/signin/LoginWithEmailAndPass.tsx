import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'
import InputText from '../../components/common/InputText'
import { styles } from './styles'
import EyeIcon from '../../assets/eye.png';
import EyeOffIcon from '../../assets/eye-off.png';
import SecondaryButton from '../../components/common/SecondaryButton';

const LoginWithEmailAndPass = ({ formData, setFormData, isPasswordVisible, setIsPasswordVisible, loginApi, navigation }: any) => {
    return (
        <>
            <InputText
                value={formData.email}
                placeholder={'Enter email or phone number'}
                secure={false}
                onChangeText={(email: string) =>
                    setFormData({ ...formData, email: email.toLowerCase() })
                }
            />

            {/* Password Input with Eye Icon */}
            <View style={styles.passwordContainer}>
                <InputText
                    value={formData.password}
                    placeholder={'Password'}
                    secure={!isPasswordVisible} // Hide/Show password based on isPasswordVisible
                    onChangeText={(pass: string) =>
                        setFormData({ ...formData, password: pass })
                    }
                    style={styles.passwordInput}
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeIconContainer}
                >
                    <Image
                        source={isPasswordVisible ? EyeOffIcon : EyeIcon} // Toggle between eye and eye-off icon
                        style={[styles.eyeIcon, { tintColor: 'gray' }]} // Change icon color based on focus
                    />
                </TouchableOpacity>
            </View>

            <Pressable>
                <Text
                    style={styles.text}
                    onPress={() => navigation.navigate('forgetYourPassword')}
                >
                    Forgot your Password?
                </Text>
            </Pressable>

            <View>
                <SecondaryButton
                    title={'Sign In'}
                    disabled={false}
                    onPress={() => loginApi()}
                />
            </View>
        </>
    )
}

export default LoginWithEmailAndPass