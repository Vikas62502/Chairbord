import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const isSmallScreen = width < 400;

export const styles = StyleSheet.create({
    container: {
        padding: '5%',
        paddingVertical: 10
    },
    heading: {
        color: '#000000',
        fontWeight: '600',
        fontSize: isSmallScreen ? 26 : 32,
        lineHeight: isSmallScreen ? 32 : 38,
        marginTop: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        width: isSmallScreen ? '70%' : '80%',
        marginTop: isSmallScreen ? 6 : 10
    },
    verticalDivider: {
        height: '100%',
        width: 2,
        backgroundColor: '#CCCCCC'
    },
    tabSection: {
        width: '50%'
    },
    activeState: {
        borderBottomColor: '#000000',
        borderBottomWidth: 2
    },
    activeContent: {
        color: '#000000'
    },
    tabContent: {
        fontWeight: '400',
        fontSize: isSmallScreen ? 16 : 20,
        lineHeight: 24,
        textAlign: 'center',
        color: '#A6A6A6'
    },
    content: {
        fontWeight: '400',
        fontSize: 12,
        color: '#263238',
    },
    text: {
        color: '#263238',
        marginBottom: isSmallScreen ? '3%' : '5%',
        textAlign: 'center',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    passwordInput: {
        flex: 1,
    },
    eyeIconContainer: {
        position: 'absolute',
        right: 10,
        padding: 10,
        justifyContent: 'center',
    },
    eyeIcon: {
        width: 20,
        marginBottom: 4,
        height: 18,
    },
    termsContainer: {
        marginTop: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    termsText: {
        color: '#263238',
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'center',
    },
    link: {
        color: '#0693D9',
        fontSize: 12,
        textAlign: 'center',
    },
});