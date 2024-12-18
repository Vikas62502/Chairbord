import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const isSmallScreen = width < 400;

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'light-blue'
    },
    swipperContainer: {
        height: height * 0.3,
        padding: '5%'
    },
    dashboardCard2: {
        width: width * 0.2,
        height: height * 0.12,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    dashbordCardText2: {
        fontWeight: '400',
        fontSize: isTablet ? 24 : isSmallScreen ? 12 : 14,
        lineHeight: isTablet ? 28 : 18,
        color: 'black',
        textAlign: 'center'
    },
    iconContainer2: {
        backgroundColor: '#02546D',
        height: isTablet ? 80 : 50,
        width: isTablet ? 80 : 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: isTablet ? 12 : 8
    },
    icon2: {
        width: '55%',
        height: '55%'
    },
    textContainer: {
        alignItems: 'center'
    },
    dividerContainer: {
        alignItems: 'center',
        marginTop: '1%'
    },
    divider: {
        width: '60%',
        height: 1,
        backgroundColor: '#4C6470'
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: isTablet ? 30 : isSmallScreen ? 12 : 15,
        alignItems: 'center',
        width: 'auto',
        gap: 4
    },
    imageWrapper: {
        position: 'relative',
        // width: isSmallScreen ? 170 : 150,
        width: 'auto',
        // height: isSmallScreen ? 80 : 100
        height: 'auto'
    },
    textOverlay: {
        position: 'absolute',
        top: -5,
        left: 20,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    numberText: {
        fontSize: isSmallScreen ? 32 : 36,
        color: '#fff',
        fontWeight: 'bold'
    },
    descriptionText: {
        fontSize: isSmallScreen ? 14 : 16,
        color: '#fff',
        fontWeight: '400'
    },
    image: {
        width: isTablet ? width * 0.42 : width * 0.39,
        height: isTablet ? height * 0.2 : height * 0.12,
        resizeMode: 'contain'
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: isTablet ? 30 : 15,
        marginVertical: 20,
        borderRadius: 25,
        padding: isSmallScreen ? 8 : 15,
        paddingBottom: 0,
        height: isSmallScreen ? 110 : 'auto',
        width: 'auto',
        backgroundColor: '#E0E0E0',
        justifyContent: 'space-between'
    }
});