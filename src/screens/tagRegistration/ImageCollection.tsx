import { View, Text, SafeAreaView, ActivityIndicator, ScrollView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import Loader from '../../components/ui/Loader'
import UploadDoc from '../../components/common/UploadDoc'
import PrimaryBtn from '../../components/common/PrimaryBtn'
import { client } from '../../client/Axios'

const ImageCollection = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [imageGallaryData, setImageGallaryData] = useState<any>();
  console.log(imageGallaryData, "res")

  const handleImageSelected = async (key: string, base64Image: string) => {
    let bodyData = JSON.stringify({
      regDetails: {
        "sessionId": "dcdb76851bfc45258c616c9ebcdde57c"
      },
      documentDetails: {
        "imageType": key,
        "image": base64Image
      },
      customerId: 6,
      vehicleId: "RJ14UH0250"
    })
    // let res = await client.post("/bajaj/uploadImages", {
    //   bodyData
    // })
    setImageGallaryData((prevState: any) => ({
      ...prevState,
      [key]: {
        imageType: key,
        image: base64Image
      }
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Image Collection'}
        showBackButton={true}
        navigateTo={() => props.navigation.goBack()}
      />
      {loading && (
        <Loader />
      )}

      <ScrollView>
        <View style={{ marginTop: "10%", padding: "5%" }}>
          <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", marginBottom: "3%" }}>RC copy photo</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ height: 200, width: 180, }}>
              {imageGallaryData && imageGallaryData?.RCFRONT ? <Pressable onPress={() => setImageGallaryData({ ...imageGallaryData, RCFRONT: null })}>
                <Image
                  source={{ uri: imageGallaryData?.RCFRONT?.image }}
                  style={{ height: 150, width: '100%' }}
                />
              </Pressable> : <UploadDoc text={'Upload RC copy (Front)'} setUploadFile={(value: any) => handleImageSelected('RCFRONT', value)} />}
            </View>
            <View style={{ height: 200, width: 180, }}>
              {imageGallaryData && imageGallaryData?.RCBACK ? <Pressable onPress={() => setImageGallaryData({ ...imageGallaryData, RCBACK: null })}>
                <Image
                  source={{ uri: imageGallaryData?.RCBACK?.image }}
                  style={{ height: 150, width: '100%' }}
                />
              </Pressable> : <UploadDoc text={'Upload RC copy (Back)'} setUploadFile={(value: any) => handleImageSelected('RCBACK', value)} />}
            </View>
          </View>

          <View style={{ marginTop: "8%" }}>
            <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", marginBottom: "3%" }}>Vehicle image</Text>
            {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}> */}
            <View style={{ height: 200, width: "100%", marginBottom: "5%" }}>

              {imageGallaryData && imageGallaryData?.VEHICLEFRONT ? <Pressable onPress={() => setImageGallaryData({ ...imageGallaryData, VEHICLEFRONT: null })}>
                <Image
                  source={{ uri: imageGallaryData?.VEHICLEFRONT?.image }}
                  style={{ height: 150, width: '100%' }}
                />
              </Pressable> : <UploadDoc text={'Upload vehicle image (Front)'} setUploadFile={(value: any) => handleImageSelected('VEHICLEFRONT', value)} />}
            </View>

            <View style={{ height: 200, width: "100%" }}>

              {imageGallaryData && imageGallaryData?.VEHICLESIDE ? <Pressable onPress={() => setImageGallaryData({ ...imageGallaryData, VEHICLESIDE: null })}>
                <Image
                  source={{ uri: imageGallaryData?.VEHICLESIDE?.image }}
                  style={{ height: 150, width: '100%' }}
                />
              </Pressable> : <UploadDoc text={'Upload vehicle image (Side)'} setUploadFile={(value: any) => handleImageSelected('VEHICLESIDE', value)} />}
            </View>
            {/* </View> */}
          </View>


          <View style={{ marginTop: "8%" }}>
            <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", marginBottom: "3%" }}>Tag image</Text>

            <View style={{ height: 200, width: "100%", }}>
              {imageGallaryData && imageGallaryData?.TAGAFFIX ? <Pressable onPress={() => setImageGallaryData({ ...imageGallaryData, TAGAFFIX: null })}>
                <Image
                  source={{ uri: imageGallaryData?.TAGAFFIX?.image }}
                  style={{ height: 150, width: '100%' }}
                />
              </Pressable> : <UploadDoc text={'Upload Tag Image'} setUploadFile={(value: any) => handleImageSelected('TAGAFFIX', value)} />}

            </View>

          </View>
        </View>

        <View style={{ alignItems: "center", paddingBottom: "5%" }}>
          <PrimaryBtn
            title={'Next'}
            onPress={() => props.navigation.navigate('tagRegistration')}
            disabled={undefined}
          />
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

export default ImageCollection
