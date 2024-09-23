import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet
} from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/common/SearchBar'
import SelectFieldSmall from '../../components/common/SelectFieldSmall'
import { IssuanceTrackerData, bankName } from './IssuanceTrackerData'
import ExcelButton from '../../components/ui/ExcelButton'
import IssuanceCards from './IssuanceCards'
import OverlayHeader from '../../components/OverlayHeader'
import { getCache } from '../../helper/Storage'
import { client } from '../../client/Axios'
import Loader from '../../components/ui/Loader'

const IssuanceTracker = () => {
  const [showIssuanceModal, setShowIssuanceModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [agentId, setAgentId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [issuanceData, setIssuanceData] = useState([]);

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      IssuanceTracker()
    } catch (error) {
      console.log(error, 'error')
    } finally {
      setRefreshing(false)
    }
  }

  const fetchReports = async (id) => {
    setLoading(true);
    try {
      const res = await client.get(`/reports/reports/agent/${id}`);
      // console.log(res.data.reports[0].customerDetail.vehicles[0].fastTags[0].TAGaFixImage, 'Response data');
      console.log(res.data.reports[0], "reports here");
      setIssuanceData(res.data.reports);
    } catch (error) {
      // Check if the error response exists and has a message
      const errorMessage = error.response?.data?.error || 'Reports not found';
      console.error('Error fetching reports:', errorMessage);
      alert(errorMessage); // Display the error message from the backend
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const getUserDataFromCache = async () => {
      const userData = await getCache('userData')
      if (userData?.user?.id) {
        setAgentId(userData.user.id)
      } else {
        console.log('User data not found')
      }
    }

    getUserDataFromCache()
  }, [])

  useEffect(() => {
    if (agentId) {
      fetchReports(agentId)
    }
  }, [agentId])

  return (
    <>
      {loading && <Loader />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <OverlayHeader title={'Issuance Tracker'} showBackButton={true} />
        <View style={{ padding: '5%' }}>
          <SearchBar setShowInventoryModal={setShowIssuanceModal} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View style={{ width: '65%', marginEnd: '5%' }}>
              <SelectFieldSmall title={'Select Bank'} dataToRender={bankName} />
            </View>
            <ExcelButton
              title={'Excel'}
              style={{ justifyContent: 'center', padding: 10 }}
            />
          </View>

          <View style={{ marginTop: '5%' }}>
            {issuanceData.map((data, index) => (
              <IssuanceCards key={index} data={data} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default IssuanceTracker
