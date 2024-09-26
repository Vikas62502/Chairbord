import { View, Text, StyleSheet, Image, RefreshControl,SafeAreaView, Pressable, ScrollView, TextInput,Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import WalletCards from './WalletCards';
import walletCardData from './WalletCardData';
import FilterTags from './FilterTags';
import { client } from '../../client/Axios';
import getDate from '../../utils/getDate';
import OverlayHeader from '../../components/OverlayHeader';
const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen =width<400;
const Wallet = (props) => {
  const [searchText, setSearchText] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [walletDetails, setWalletDetails] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const tagsData = ['All', 'Send', 'Received', 'Top Up', 'Withdraw'];

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getWalletDetails();
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setRefreshing(false);
    }
  };

  const getWalletDetails = async () => {
    try {
      const response = await client.get(`/wallet/transactions/agent-get`);
      setWalletDetails(response.data);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getWalletDetails();
  }, []);

  const sortedTransactions = walletDetails?.transactions?.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  // Filter transactions based on searchText
  const filteredTransactions = sortedTransactions?.filter((transaction) => {
    const searchLower = searchText.toLowerCase();
    return (
      transaction.reason.toLowerCase().includes(searchLower) ||
      transaction.transactionId.toLowerCase().includes(searchLower) ||
      transaction.RefNo?.toLowerCase().includes(searchLower) ||
      transaction.amount.toString().includes(searchLower)
    );
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Wallet'}
        showBackButton={true}
      />
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      
      <View style={{ padding: '5%' }}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceText}>Balance</Text>
          <Text style={styles.amountText}>
          &#x20B9;{walletDetails?.agent?.balance || 0}
          </Text>

          <View style={{ flexDirection: 'row', gap: 30, marginTop: '2%' }}>
            <Pressable
              onPress={() =>
                props.navigation.navigate('topupWallet', {
                  walletBalance: walletDetails?.agent?.balance || 0
                })
              }
            >
              <Image
                source={require('../../assets/screens/wallet/topUp.png')}
              />
              <Text style={styles.tagText}>Top up</Text>
            </Pressable>

            <View>
              <Image source={require('../../assets/screens/wallet/dowload.png')} />
              <Text style={styles.tagText}>Statement</Text>
            </View>
          </View>
        </View>

        <View style={styles.searchAndfilter}>
          <View style={styles.searchField}>
            <Image
              source={require('../../assets/screens/wallet/search.png')}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor={'#9A9A9A'}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <Pressable
            onPress={() => setShowFilterModal(true)}
            style={styles.filterLogo}
          >
            <Image source={require('../../assets/screens/wallet/filterLogo.png')} style={{ height:30 ,width:30}} />
          </Pressable>
        </View>
      </View>

      <View style={styles.transactionContainer}>
        <Text style={styles.transactionText}>Transaction</Text>

        <ScrollView horizontal={true}>
          {tagsData.map((data, index) => (
            <Pressable
              style={[
                styles.tags,
                activeTag === data ? styles.activeTag : null
              ]}
              key={index}
              onPress={() => setActiveTag(data)}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: activeTag === data ? 'white' : '#263238',
                  textAlignVertical: 'center'
                }}
              >
                {data}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View>
          {filteredTransactions?.map((data, index) => (
            <WalletCards
              key={index}
              logo={data.logo}
              title={data.reason}
              reason={data.reason}
              amountValue={data.amount}
              type={data.type}
              ID={data.transactionId}
              RefNo={data.RefNo}
              date={data.updatedAt}
              time={data.updatedAt}
            />
          ))}
        </View>
      </View>

      {/* Filter modal */}
      <FilterTags
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />
      
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  balanceCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 178,
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
  tagText: {
    color: '#808080',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    marginTop: '10%'
  },
  searchAndfilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '80%',
    gap: 10,
    marginTop: '5%'
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 22,
    borderWidth: 1,
    width:isSmallScreen?'78%':'80%',
    borderColor: '#858585',
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000'
  },
  filterLogo: {
    borderWidth: 1,
    borderColor: '#858585',
    borderRadius: 50,
    padding: 14,
  },
  transactionContainer: {
    elevation: 2,
    shadowColor: '#00000040',
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: '5%',
    paddingBottom: '10%',
  },
  transactionText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    color: '#000000',
    paddingVertical: '5%'
  },
  tags: {
    height: 40,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#263238',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  activeTag: {
    backgroundColor: '#02546D'
  }
});

export default Wallet;
