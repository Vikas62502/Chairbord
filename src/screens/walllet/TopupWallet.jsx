import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image
} from 'react-native'
import React from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import HorizontalDivider from '../../components/common/HorizontalDivider'
import InputText from '../../components/common/InputText'
import CustomInputText from '../../components/common/CustomInputText'
import LinearButton from '../../components/common/LinearButton'

const TopupWallet = () => {
  return (
    <>
      <OverlayHeader title={'Wallet'} navigateTo={'drawer'} />
      <ScrollView style={styles.container}>
        <View style={{ padding: '5%' }}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceText}>Balance</Text>
            <Text style={styles.amountText}>₹1,055</Text>
            <HorizontalDivider />

            <Text
              style={[
                styles.miniText,
                { color: '#000000', marginBottom: '3%' }
              ]}
            >
              Topup Wallet
            </Text>
            <CustomInputText
              placeholder={'Enter amount'}
              keyboardType={'numeric'}
            />

            <Text
              style={[
                styles.miniText,
                { color: '#858585', marginVertical: '3%' }
              ]}
            >
              Recommended
            </Text>

            <View style={{ flexDirection: 'row', gap: 10, marginBottom: '8%' }}>
              {[500, 1000, 1500, 2000].map((amount, index) => (
                <Pressable
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: '#02546D',
                    borderRadius: 5
                  }}
                >
                  <Text style={styles.recommendText}>₹{amount}</Text>
                </Pressable>
              ))}
            </View>

            <LinearButton
              title={'PROCEED TO TOPUP'}
              onPress={() => {}}
              style={{ marginTop: '5%' }}
            />

            <HorizontalDivider />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
              >
                <Image
                  source={require('../../assets/screens/wallet/autoTopupIcon.png')}
                />
                <View>
                  <Text style={[styles.miniText, { color: '#000000' }]}>
                    Set auto Top-up
                  </Text>
                  <Text style={[styles.miniText, { color: '#9A9A9A' }]}>
                    Never run out of balance
                  </Text>
                </View>
              </View>

              <Image
                source={require('../../assets/screens/wallet/rightArrow.png')}
              />
            </View>

            {/* <View style={[styles.WalletDetailsCard, { marginTop: '5%' }]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center'
                  }}
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
            </View> */}
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
                  source={require('../../assets/screens/wallet/transactionIcon.png')}
                />
                <Text style={styles.accountNoText}>
                  Wallet Transaction History
                </Text>
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
  balanceCard: {
    padding: '5%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 2
  },
  balanceText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#9A9A9A'
  },
  amountText: {
    fontWeight: '600',
    fontSize: 40,
    lineHeight: 48,
    textAlign: 'center',
    marginBottom: '2%',
    color: '#000000'
  },
  miniText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14
    // marginBottom: '3%'
  },
  recommendText: {
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    color: '#000000',
    paddingVertical: '2%',
    paddingHorizontal: '5%'
  },
  WalletDetailsCard: {
    padding: '5%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 2
  },
  accountNoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000'
  }
})

export default TopupWallet
