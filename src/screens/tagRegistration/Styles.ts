import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../helper/Metrics";

const styles = StyleSheet.create({
    container: {
        padding: "5%"
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 10,
    },
    label: {
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 19,
        color: "#000000",
        marginVertical: "4%"
    },
    dataDetailContainer: {
        borderWidth: 1,
        borderColor: "#263238",
        borderRadius: 20,
        padding: "5%"
    },
    customerDetailsValueText: {
        color: "#000000",
        width: "55%",
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16
    },
    customerValueText: {
        color: "#000000",
        width: "45%",
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16
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
    customerDetailsTitleText: {
        color: "grey",
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16
    },
    customerDetailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "1%"
    },
    uploadDocContainer: {
        borderWidth: 1,
        borderColor: "#263238",
        height: verticalScale(175),
        width: horizontalScale(163),
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    uploadVehicle: {
        borderWidth: 1,
        borderColor: "#263238",
        height: verticalScale(175),
        width: horizontalScale(333),
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    uploadText: {
        textAlign: "center",
        color: "#263238",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19
    },
    imagePlaceholder: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    imagePlaceholderText: {
        color: '#7f7f7f',
    },
})

export default styles;