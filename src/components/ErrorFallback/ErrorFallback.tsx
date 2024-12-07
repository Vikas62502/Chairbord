import { Button, StyleSheet, Text, View } from "react-native";

// Fallback UI for ErrorBoundary
const ErrorFallback = ({ error, resetError }: any) => {
    const resetAppState = () => {
        // Reset any necessary state here
        resetError();
    };

    return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Oops! Something went wrong.</Text>
            <Text style={styles.errorMessage}>{error.toString()}</Text>
            <Button title="Try Again" onPress={resetAppState} />
        </View>
    );
};

export default ErrorFallback;

// Styles for the ErrorBoundary UI
const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    errorMessage: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
});
