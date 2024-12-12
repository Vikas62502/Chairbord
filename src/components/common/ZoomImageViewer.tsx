import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

type ZoomImageViewerProps = {
    images: { url: string }[];
    visible: boolean;
    onClose: () => void;
};

const ZoomImageViewer: React.FC<ZoomImageViewerProps> = ({ images, visible, onClose }) => {
    return (
        <Modal visible={visible} transparent={true} onRequestClose={onClose}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
                <ImageViewer imageUrls={images} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 20,
        padding: 10,
    },
    closeText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ZoomImageViewer;
