import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: '5%'
    },
    label: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        color: '#000000',
        marginTop: '5%',
        marginBottom: '3%'
    },
    errorText: {
        padding: '2%',
        paddingHorizontal: '4%',
        color: '#FF0000'
    },
    subDescription: {
        color: '#000000',
        fontSize: 12,
        lineHeight: 14,
        fontWeight: '400',
        marginTop: '3%',
        width: '80%'
    },
    dateInput: {
        borderColor: '#263238',
        borderWidth: 1,
        color: '#000000',
        width: '100%',
        fontSize: 16,
        borderRadius: 20,
        height: 60,
        paddingHorizontal: '5%',
        backgroundColor: '#F3F3F3',
        textAlign: 'center'
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 10
    }
})
