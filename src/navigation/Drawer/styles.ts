import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window')
const isTablet = width > 768
const isSmallScreen = width <= 400

export const styles = StyleSheet.create({
    DrawerStyles: {
        backgroundColor: "black",
        flex: 1,
    },
    drawerItemStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "7%",
        gap: 20,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    modalContent: {
        width: '80%',
        height: '40%',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    checkImage: {
        width: 100,
        height: 100
    },
    modalText: {
        fontWeight: '500',
        fontSize: isSmallScreen ? 16 : 18,
        lineHeight: isSmallScreen ? 20 : 24,
        textAlign: 'center',
        color: 'black',
        marginTop: 10
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    closeButton: {
        width: 20,
        height: 20
    },
    okButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    okButton: {
        backgroundColor: '#02546D',
        borderRadius: 15,
        marginTop: 60,
        paddingVertical: '4%',
        paddingHorizontal: '15%'
    },
})