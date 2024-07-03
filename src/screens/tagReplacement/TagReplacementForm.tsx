import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator
} from 'react-native'
import React, { useEffect, useState } from 'react'
import OverlayHeader from '../../component/OverlayHeader'
import CustomerDetailsCard from '../../component/CustomerDetailsCard'
import SelectField from '../../component/common/SelectField'
import InputText from '../../component/common/InputText'
import SecondaryButton from '../../component/common/SecondaryButton'
import SuccessModal from '../../component/SuccessModal'
import { tagReplacementApiRequest } from '../../services/AuthService'
import { getCache } from '../../helper/Storage'



const replacementReason = [
  {
    id: 1,
    reasonId: '1',
    title: 'Tag Damaged'
  },
  {
    id: 2,
    reasonId: '2',
    title: 'Lost Tag'
  },
  {
    id: 3,
    reasonId: '3',
    title: 'Tag Not Working'
  },
  {
    id: 4,
    reasonId: '99',
    title: 'Others'
  }
]

const TagReplacementForm = (props: any) => {
  const { validateOtpResp } = props?.route?.params

  const mobileNo = validateOtpResp.custDetails.mobileNo
  const walletId = validateOtpResp.custDetails.walletId
  const vehicleNo = validateOtpResp.vrnDetails.vehicleNo
  const chassisNo = validateOtpResp.vrnDetails.chassisNo
  const debitAmt = validateOtpResp.vrnDetails.repTagCost

  const [modalShow, setModalShow] = useState<null | boolean>(null)
  const [modelIsSuccess, setModelIsSuccess] = useState<null | boolean>(null)
  const [tagSerialNumber, setTagSerialNumber] = useState('')
  const [sessionId, setSessionId] = React.useState('')
  const [reasonOfReplacement, setReasonOfReplacement] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const customerTagReplacement = async () => {
    setLoading(true)
    const response = await tagReplacementApiRequest(
      sessionId,
      mobileNo,
      walletId,
      vehicleNo,
      chassisNo,
      debitAmt,
      `608268-001-${tagSerialNumber}`,
      reasonOfReplacement,
      '',
      '',
      '',
      '',
      ''
    )
    setLoading(false)
    if (response.success) {
      setModalShow(true)
      setModelIsSuccess(true)
    } else {
      setModalShow(true)
      setModelIsSuccess(false)
    }
  }
  const customerDetailsData = [
    {
      title: 'Name',
      value: `:  ${validateOtpResp?.custDetails?.name}`
    },
    {
      title: 'Mobile Number',
      value: `:  ${validateOtpResp?.custDetails?.mobileNo}`
    }
  ]

  const existingTagDetailData = [
    {
      title: 'Chassis No.',
      value: `:  ${validateOtpResp?.vrnDetails?.chassisNo}`
    },
    {
      title: 'Engine No.',
      value: `:  ${validateOtpResp?.vrnDetails?.engineNo}`
    },
    {
      title: 'Commercial Status',
      value: `:  ${validateOtpResp?.vrnDetails?.isCommercial}`
    },
    {
      title: 'Vehicle Type',
      value: `:  ${validateOtpResp?.vrnDetails?.vehicleType}`
    }
  ]
  const getSessionId = async () => {
    const session = await getCache('session')
    setSessionId(session)
  }
  useEffect(() => {
    getSessionId()
  }, [sessionId])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <OverlayHeader
          title={'Tag Replacement'}
          showBackButton={true}
          navigateTo={() => navigation.goBack()}
        />

        <View style={styles.container}>
          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          <CustomerDetailsCard
            customerDetailsData={customerDetailsData}
            errorMessage={'*Minimum balance should be 250 in customer FASTag'}
          />

          <Text style={styles.label}>Vehicle number</Text>
          <View style={{ flex: 1 }}>
            <InputText placeholder={''} value={vehicleNo} editable={false} />
          </View>


          <CustomerDetailsCard
            customerDetailsData={existingTagDetailData}
            title="Existing tag details"
          />
          <Text style={styles.subDescription}>
            Only Tag Serial number will be update, all other details will remian
            same
          </Text>

          <Text style={styles.label}>Tag serial number</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <InputText placeholder={''} value='608268' editable={false} />
            </View>
            <View style={{ flex: 1, marginHorizontal: "5%" }}>
              <InputText placeholder={''} value='001' editable={false} />
            </View>
            <View style={{ flex: 1 }}>
              <InputText placeholder={'xxxxxx'} onChangeText={(text: string) => setTagSerialNumber(text)} value={tagSerialNumber} />
            </View>
          </View>

          <Text style={styles.label}>Replacement reason</Text>
          <SelectField
            selectedValue={(value: any) => setReasonOfReplacement(value.reasonId)}
            dataToRender={replacementReason}
            title={'Select replacement reason'}
          />

          {reasonOfReplacement === '99' && (
            <View>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={{ borderWidth: 1, borderColor: "#000000", borderRadius: 25, color: '#000000' }}
                placeholder={'Enter description'}
                onChangeText={(text: string) => setDescription(text)}
                value={description}
                multiline
                numberOfLines={4}
              />
            </View>
          )}

          <Text style={styles.label}>Replacement charges: {debitAmt}</Text>

          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              gap: 10,
              marginVertical: '5%'
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#263238',
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25
              }}
            >
              <View>
                <Text
                  style={{
                    color: '#263238',
                    fontSize: 28,
                    lineHeight: 33,
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ width: '50%' }}>
              <SecondaryButton
                title={'Submit'}
                onPress={() => customerTagReplacement()}
              />
            </View>
          </View>
        </View>

        <SuccessModal isSuccess={modelIsSuccess} visible={modalShow} title={'Tag replaced successfully'} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: '5%'
  },
  label: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
    marginTop: '5%',
    marginBottom: '3%'
  },
  errorText: {
    padding: '2%',
    paddingHorizontal: '4%',
    color: '#FF0000'
  },
  subDescription: {
    color: '#000000',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400',
    marginTop: '3%',
    width: '80%'
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 10,
  },
})

export default TagReplacementForm
