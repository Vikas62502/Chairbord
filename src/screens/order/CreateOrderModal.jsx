import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable, Image } from 'react-native';
import InputText from '../../components/common/InputText';
import SelectField from '../../components/common/SelectFieldBig';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/ui/Loader';
import { client } from '../../client/Axios';
import { getCache } from '../../helper/Storage';
import { useOrders } from '../../orderContext/OrderContext';

const CreateOrderModal = ({ visible, onClose, onApply }) => {
  const navigation = useNavigation();

  // Access the ordersArray and setOrdersArray from context
  const { ordersArray, setOrdersArray } = useOrders();

  const [orderBodyData, setOrderBodyData] = useState({
    bankId: 0,
    vehicleClass: 0,
    tagCost: 0,
    quantity: 0,
    amount: 0
  });

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [tagCost, setTagCost] = useState('');

  const formDataHandler = (key, value) => {
    setOrderBodyData({ ...orderBodyData, [key]: value });
  };

  const setBank = (selectedItem, index) => {
    formDataHandler('bankId', selectedItem.id);
  };

  const bankNameData = [
    { title: 'Bajaj', id: 1 },
    { title: 'SBI', id: 2 },
    { title: 'PNB', id: 3 },
    { title: 'KOTAK', id: 4 }
  ];

  const vehicleClassData = [
    { title: 'VC 4', id: 'VC4' },
    { title: 'VC 5', id: 'VC5' }
  ];

  const getUserData = async () => {
    let userData = await getCache('userData');
    setUserData(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleTagCost = async () => {
    setLoading(true);
    try {
      const response = await client.post('/order/fastag/get-tag-cost', {
        agentId: userData?.user?.id,
        bankId: orderBodyData.bankId,
        vehicleClass: orderBodyData.vehicleClass
      });
      setTagCost(JSON.stringify(response.data.cost));
      setOrderBodyData({ ...orderBodyData, tagCost: response.data.cost });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderBodyData.bankId !== 0 && orderBodyData.vehicleClass !== 0) {
      handleTagCost();
    }
  }, [orderBodyData.bankId, orderBodyData.vehicleClass]);

  useEffect(() => {
    setOrderBodyData({
      ...orderBodyData,
      amount: orderBodyData.quantity * orderBodyData.tagCost
    });
  }, [orderBodyData.quantity]);

  const handleNext = () => {
    setOrdersArray((prevOrdersArray) => {
      const updatedOrders = [...prevOrdersArray, { ...orderBodyData }];
      console.log(updatedOrders, 'Updated array with new order');
      handleClose();
      navigation.navigate('orderDetails');
      return updatedOrders;
    });
  };

  const handleClose = () => {
    setOrderBodyData({
      bankId: 0,
      vehicleClass: 0,
      tagCost: 0,
      quantity: 0,
      amount: 0
    });
    setTagCost('');
    onClose();
  };

  return (
    <>
      {loading && <Loader />}
      <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '5%' }}>
              <View>
                <Text style={styles.titleText}>Create Order</Text>
              </View>
              <View>
                <Pressable onPress={onClose}>
                  <Image
                    source={require('../../assets/DrawerNavigation/closeLogout.png')}
                    alt="closeBtn"
                    style={{ width: 20, height: 20 }}
                  />
                </Pressable>
              </View>
            </View>
            <SelectField dataToRender={bankNameData} title={'Select bank name'} selectedValue={setBank} />
            <View style={{ marginTop: '5%' }}>
              <SelectField
                dataToRender={vehicleClassData}
                title={'Select vehicle class'}
                selectedValue={(selectedItem, index) => {
                  formDataHandler('vehicleClass', selectedItem.id);
                }}
              />
            </View>

            <View style={{ width: '100%', marginTop: '4%' }}>
              <InputText value={tagCost} placeholder="Tag Cost" secure={false} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '45%' }}>
                <InputText
                  placeholder={'Enter quantity'}
                  inputStyle={{ width: '100%' }}
                  value={orderBodyData.quantity}
                  onChangeText={(value) => {
                    formDataHandler('quantity', value);
                  }}
                />
              </View>
              <View style={{ width: '45%' }}>
                <InputText placeholder={'Enter amount'} inputStyle={{ width: '100%' }} value={JSON.stringify(orderBodyData.amount)} />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleClose} style={styles.button}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNext()} style={[styles.button, styles.applyButton]}>
                <Text style={[styles.buttonText, styles.applyButtonText]}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%'
  },
  button: {
    flex: 1,
    paddingVertical: '3%',
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#263238'
  },
  applyButton: {
    backgroundColor: '#263238',
    marginLeft: '5%'
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#263238'
  },
  applyButtonText: {
    color: '#fff'
  }
});

export default CreateOrderModal;
