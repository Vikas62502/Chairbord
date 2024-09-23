import React, { useState } from 'react';
import { View, Text, StyleSheet,ScrollView, Image, Modal, Pressable, TouchableOpacity, } from 'react-native'
import VerticalDivider from '../../components/common/VerticalDivider'
import UploadDoc from '../../components/common/UploadDoc';

const IssuanceCards = ({ data }) => {
  // commision icons
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const pendingCommisionIcon = require('../../assets/commision/commissionPending.png')
  const commisionDeniedIcon = require('../../assets/commision/commissionDenied.png')
  const commisionApprovedIcon = require('../../assets/commision/commsionApprove.png')
  const commisionPartaillyPaidIcon = require('../../assets/commision/partialCommission.png')

  // const handleReportdata=async()=>{
  //   setModalVisible(true);
  // }
  const reportDetailsData = [
    {
      title: "Customer Name",
      value: "Mohit Kumar"
    },
    {
      title: "Customer ID",
      value: "AUFPN1153N"
    },
    {
      title: "Vehicle Number",
      value: "GJ18BE7780"
    },
    {
      title: "Tag Serial Number",
      value: "608268-001-0426293"
    },
    {
      title: "Vehicle Class",
      value: "VC 4"
    },
    {
      title: "Engine Number",
      value: "25522"
    },
    {
      title: "Commercial Status",
      value: "false"
    },
    {
      title: "Chassis Number",
      value: "MA3EUA61S00857712"
    },
  ]

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: `${data.ribbonBgColor}`,
          padding: '4%',
          borderRadius: 10
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: `${'data.color'}`,
              borderRadius: 50,
              marginRight: '5%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 30,
              width: 30
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: 16,
                lineHeight: 19
              }}
            >
              {'data.number'}
            </Text>
          </View>
          <View>
            <Text style={styles.idText}>607469-00B-258445</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.dateAndTimeText}>{'20:19:36'}</Text>
              <VerticalDivider />
              <Text style={styles.dateAndTimeText}>{'16-03-2024'}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.amount}>₹50</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: '5%'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <View>
            <Text style={styles.text}>Suresh Kumar Kumawat</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                borderWidth: 3,
                borderColor: '#000000',
                padding: '2%',
                borderRadius: 10,
                width: '80%',
                marginTop: '3%',
                backgroundColor: `${data.isCommercial ? '#FAFF00' : '#FFFFFF'}`
              }}
            >
              <Image
                source={require('../../assets/commision/indNamePlate.png')}
              />
              <Text style={styles.text}>RJ14VD8878</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.text}>9158628546</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: '3%'
            }}
          >
            <Image source={require('../../assets/bankIcon.png')} />
            <Text style={styles.bankText}>KOTAK</Text>
          </View>
        </View>
      </View>
      <View
        style={{ height: '0.3%', width: '100%', backgroundColor: '#959595' }}
      ></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '4%'
        }}
      >
        <Pressable onPress={() => setModalVisible(true)}>
          <Image source={require('../../assets/eyeIcon.png')} />
        </Pressable>

        <Image
          source={
            data.status === 'denied'
              ? commisionDeniedIcon
              : data.status === 'pending'
                ? pendingCommisionIcon
                : data.status === 'success'
                  ? commisionApprovedIcon
                  : commisionPartaillyPaidIcon
          }
        />
        <Image source={require('../../assets/dangerPalm.png')} />
      </View>
      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {/* Modal content */}
            <Pressable style={styles.closeButtonContainer} onPress={() => setModalVisible(false)}>
              <Image source={require('../../assets/close.png')} style={styles.closeButton} />
            </Pressable>
            <ScrollView contentContainerStyle={{padding:5,alignItems: 'center',gap:10}}>
            <View style={styles.detailsSection}>
              <Text style={styles.label}>Report Details</Text>

              <View style={styles.dataContainer}>
                {reportDetailsData && reportDetailsData.map((data, index) => (
                  <View style={styles.reportDetailsContainer} key={index}>
                    <Text style={styles.reportDetailsTitleText}>{data.title}</Text>
                    <Text style={styles.reportDetailsValueText}>:  {data.value}</Text>
                  </View>
                ))}
              </View>
            </View >
<View style={{ height: 200, width: 345, gap:7}}>
  <Text style={{color:'grey',fontWeight:'400',fontSize:16}}>RC Front</Text>
  <UploadDoc text={'RC copy (Front)'} />
  </View>
  <View style={{ height: 200, width: 345, gap:7}}>
  <Text style={{color:'grey',fontWeight:'400',fontSize:16}}>RC Back</Text>
  <UploadDoc text={'RC copy (Front)'} />
  </View>
  <View style={{ height: 200, width: 345, gap:7}}>
  <Text style={{color:'grey',fontWeight:'400',fontSize:16}}>Vehicle Front</Text>
  <UploadDoc text={'RC copy (Front)'} />
  </View>
  <View style={{ height: 200, width: 345, gap:7}}>
  <Text style={{color:'grey',fontWeight:'400',fontSize:16}}>Vehicle Side</Text>
  <UploadDoc text={'RC copy (Front)'} />
  </View>
  <View style={{ height: 200, width: 345, gap:7}}>
  <Text style={{color:'grey',fontWeight:'400',fontSize:16}}>Tag Image</Text>
  <UploadDoc text={'RC copy (Front)'} />
  </View>
  
  </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
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
    lineHeight: 14
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
    fontSize: 16,
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
  text: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    gap:10
  },
  modalText: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: 'black',
    marginTop: 10,
  },
  
  label: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 20,
    color: "#000000",
    marginVertical: "4%"
  },
  detailsSection: {
    alignItems: 'center',
    marginTop: 3,
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: "#263238",
    borderRadius: 20,
    padding: "5%",
    gap: 10,
  },
  reportDetailsTitleText: {
    color: "grey",
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16
  },
  reportDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "1%"
  },
  reportDetailsValueText: {
    color: "#000000",
    width: "60%",
    fontWeight: '400',
    fontSize: 14,
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
    backgroundColor:'#E0E0E0',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius:20,
    height:30,
    width:30,
    top: 15,
    right: 15,
    zIndex:10
  },
  closeButton: {
    width: 15,
   
    height: 15,
  },
})
export default IssuanceCards
