import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import HorizontalDivider from '../../components/common/HorizontalDivider'

const WalletDetails = (props) => {
  const downArrowIcon = require('../../assets/screens/wallet/downArrow.png')

  const data = [
    {
      icon: require('../../assets/screens/wallet/walletIcon.png'),
      title: 'Send Money'
    },
    {
      icon: require('../../assets/screens/wallet/bankIcon.png'),
      title: 'Check Balance'
    },
    {
      icon: require('../../assets/screens/wallet/viewHistoryIcon.png'),
      title: 'View History'
    },
    {
      icon: require('../../assets/screens/wallet/shareIcon.png'),
      title: 'Share Receipt'
    }
  ]

  return (
    <>
      <OverlayHeader title={'Wallet'} navigateTo={'drawer'} />
      <ScrollView style={styles.container}>
        <View style={{ padding: '5%' }}>
          <View style={styles.WalletDetailsCard}>
            <Text style={styles.headingText}>Received from</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: '5%'
                }}
              >
                <Image
                  source={require('../../assets/screens/wallet/walletIcon.png')}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={styles.accountNoText}>******6679</Text>
                  <Text style={styles.subAccountNoText}> XXXXX6679</Text>
                </View>
              </View>

              <View>
                <Text style={styles.amountText}>+₹855</Text>
              </View>
            </View>

            <HorizontalDivider />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View
                style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
              >
                <Image
                  source={require('../../assets/screens/wallet/transferDetailIcon.png')}
                />
                <Text style={styles.headingText}>Transfer Details</Text>
              </View>
              <Image source={downArrowIcon} />
            </View>

            <HorizontalDivider />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: '10%'
              }}
            >
              {data.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image source={item.icon} />
                    <Text style={styles.iconText}>{item.title}</Text>
                  </View>
                )
              })}
            </View>
          </View>

          <View style={[styles.WalletDetailsCard, { marginTop: '5%' }]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View
                style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
              >
                <Image
                  source={require('../../assets/screens/wallet/contactSupportIcon.png')}
                />
                <Text style={styles.accountNoText}>Contact support</Text>
              </View>
              <Image
                source={require('../../assets/screens/wallet/rightArrow.png')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  WalletDetailsCard: {
    padding: '5%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 2
  },
  headingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000'
  },
  accountNoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000'
  },
  subAccountNoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8A8A8A'
  },
  amountText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000'
  },
  iconText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#808080',
    maxWidth: 50,
    textAlign: 'center',
    marginTop: '10%'
  }
})

export default WalletDetails
