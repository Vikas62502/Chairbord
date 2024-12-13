import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ZoomableImagePreview = ({ images }: any) => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImagePress = (index: number) => {
        setCurrentIndex(index);
        setIsVisible(true);
    };

    return (
        <View style={styles.container}>
            {images.map((image: any, index: number) => (
                <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
                    <Image source={{ uri: image.url }} style={styles.thumbnail} />
                </TouchableOpacity>
            ))}

            <Modal visible={isVisible} transparent={true} onRequestClose={() => setIsVisible(false)}>
                <ImageViewer
                    imageUrls={images}
                    index={currentIndex}
                    onSwipeDown={() => setIsVisible(false)}
                    enableSwipeDown={true}
                />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    thumbnail: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 8,
    },
});

export default ZoomableImagePreview;
