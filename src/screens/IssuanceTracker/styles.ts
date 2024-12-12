import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const isSmallScreen = width < 400;

export const styles = StyleSheet.create({
    container: {
        padding: '5%',
        borderWidth: 0.7,
        borderColor: 'black',
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        marginBottom: '5%'
    },
    dateAndTimeText: {
        color: '#848484',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 14,
        marginBottom: -4
    },
    idText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 16
    },
    amount: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 24
    },
    bankText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 19,
        marginLeft: '5%'
    },
    orderIdText: {
        color: '#F0AC5C',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16,
        marginTop: '10%'
    },
    stockText: {
        color: '#00C142',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 16,
        marginLeft: '5%'
    },
    vcText: {
        color: '#000000',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 19
    },
    nametext: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 19
    },
    vehicletext: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 19
    },
    mobiletext: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 19
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    modalContent: {
        width: '90%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'flex-start',
        textAlign: 'center',
        alignItems: 'center',
        position: 'relative',
        gap: 10
    },
    modalText: {
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        color: 'black',
        marginTop: 10
    },

    label: {
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 20,
        color: '#000000',
        marginVertical: '4%'
    },
    detailsSection: {
        alignItems: 'center',
        marginTop: 3,

    },
    dataContainer: {
        borderWidth: 1,
        borderColor: '#263238',
        borderRadius: 20,
        padding: '5%',
        gap: 10,
    },
    reportDetailsTitleText: {
        color: 'grey',
        fontWeight: '400',
        fontSize: isSmallScreen ? 12 : 14,
        lineHeight: 16
    },
    reportDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '1%'
    },
    reportDetailsValueText: {
        color: '#000000',
        width: isSmallScreen ? '60%' : '60%',
        fontWeight: '400',
        fontSize: isSmallScreen ? 12 : 14,
        lineHeight: 16
    },
    // ValueText: {
    //     color: "#000000",
    //     width: "45%",
    //     fontWeight: '400',
    //     fontSize: 14,
    //     lineHeight: 16
    // },
    closeButtonContainer: {
        position: 'absolute',
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        height: 30,
        width: 30,
        top: 15,
        right: 15,
        zIndex: 10
    },
    closeButton: {
        width: 15,
        height: 15
    }
})