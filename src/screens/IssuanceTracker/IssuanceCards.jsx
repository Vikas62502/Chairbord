import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import VerticalDivider from '../../components/common/VerticalDivider'

const IssuanceCards = ({ data }) => {
  // commision icons
  const pendingCommisionIcon = require('../../assets/commision/commissionPending.png')
  const commisionDeniedIcon = require('../../assets/commision/commissionDenied.png')
  const commisionApprovedIcon = require('../../assets/commision/commsionApprove.png')
  const commisionPartaillyPaidIcon = require('../../assets/commision/partialCommission.png')
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
        <Image source={require('../../assets/eyeIcon.png')} />
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
  }
})
export default IssuanceCards
