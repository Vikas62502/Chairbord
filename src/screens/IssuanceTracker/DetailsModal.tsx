import { View, Text, Modal, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { client } from '../../client/Axios';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../components/ui/Loader';
import { modifyImage } from './utils';

const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const isSmallScreen = width < 400;

const DetailsModal = ({ modalVisible, setModalVisible, reportDetailsData }: any) => {
    const [loading, setLoading] = React.useState(false);
    const [liveImageUrl, setLiveImageUrl] = React.useState<any>({});
    const tagSerialNumber = reportDetailsData[3]?.value;

    const fetchImageData = async (tagSerialNumber: string) => {
        setLoading(true);
        try {
            const response = await client.post('/reports/image-data', {
                tagSerialNumber: tagSerialNumber,
            });
            const { data } = response;
            const tAGaFixImage = await modifyImage(data?.fastTag?.TAGaFixImage);
            const rcImageFront = await modifyImage(data?.fastTag?.rcImageFront);
            const rcImageBack = await modifyImage(data?.fastTag?.rcImageBack);
            const vehicleImageFront = await modifyImage(data?.fastTag?.vehicleImageFront);
            const vehicleImageSide = await modifyImage(data?.fastTag?.vehicleImageSide);
            setLiveImageUrl({
                TAGaFixImage: tAGaFixImage,
                rcImageFront: rcImageFront,
                rcImageBack: rcImageBack,
                vehicleImageFront: vehicleImageFront,
                vehicleImageSide: vehicleImageSide,
            });
        } catch (error) {
            console.error('Failed to fetch image data:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (tagSerialNumber && modalVisible) {
                fetchImageData(tagSerialNumber);
            }
        }, [modalVisible])
    );

    return (
        <>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Loader loading={loading} />
                        {/* Modal content */}
                        <Pressable
                            style={styles.closeButtonContainer}
                            onPress={() => setModalVisible(false)}
                        >
                            <Image
                                source={require('../../assets/close.png')}
                                style={styles.closeButton}
                            />
                        </Pressable>
                        <ScrollView
                            contentContainerStyle={{
                                padding: 5,
                                alignItems: 'center',
                                gap: 10,
                            }}
                        >
                            <View style={styles.detailsSection}>
                                <Text style={styles.label}>Report Details</Text>
                                <View style={styles.dataContainer}>
                                    {reportDetailsData &&
                                        reportDetailsData.map((data: any, index: number) => (
                                            <View style={styles.reportDetailsContainer} key={index}>
                                                <Text style={styles.reportDetailsTitleText}>
                                                    {data.title}
                                                </Text>
                                                <Text style={styles.reportDetailsValueText}>
                                                    : {data.value}
                                                </Text>
                                            </View>
                                        ))}
                                </View>
                            </View>
                            {[
                                { label: 'RC Front', key: 'rcImageFront' },
                                { label: 'RC Back', key: 'rcImageBack' },
                                { label: 'Vehicle Front', key: 'vehicleImageFront' },
                                { label: 'Vehicle Side', key: 'vehicleImageSide' },
                                { label: 'Tag Image', key: 'TAGaFixImage' },
                            ].map((item) => (
                                <View
                                    key={item.key}
                                    style={{ height: 220, width: isSmallScreen ? 290 : 345, gap: 7 }}
                                >
                                    <Text
                                        style={{
                                            color: 'grey',
                                            fontWeight: '400',
                                            fontSize: isSmallScreen ? 14 : 16,
                                        }}
                                    >
                                        {item.label}
                                    </Text>
                                    {liveImageUrl[item.key] ? (
                                        <Image
                                            source={{ uri: liveImageUrl[item.key] }}
                                            style={{
                                                width: isSmallScreen ? 290 : 345,
                                                height: 200,
                                                borderRadius: 20,
                                                borderColor: 'black',
                                                borderWidth: 1,
                                            }}
                                        />
                                    ) : (
                                        <Text>No Image</Text>
                                    )}
                                </View>
                            ))}


                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default DetailsModal;
