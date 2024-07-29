import { View, Text, SafeAreaView, ActivityIndicator, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import Loader from '../../components/ui/Loader'
import UploadDoc from '../../components/common/UploadDoc'
import SecondaryButton from '../../components/common/SecondaryButton'
import PrimaryBtn from '../../components/common/PrimaryBtn'
import LinearButton from '../../components/common/LinearButton'

const ImageCollection = (props: any) => {
  const [loading, setLoading] = useState(false)
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
              <UploadDoc text={'Upload RC copy (Front)'} />
            </View>
            <View style={{ height: 200, width: 180, }}>
              <UploadDoc text={'Upload RC copy (Back)'} />
            </View>
          </View>

          <View style={{ marginTop: "8%" }}>
            <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", marginBottom: "3%" }}>Vehicle image</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ height: 200, width: 180, }}>
                <UploadDoc text={'Upload vehicle image (Front)'} />
              </View>
              <View style={{ height: 200, width: 180, }}>
                <UploadDoc text={'Upload vehicle image (Side)'} />
              </View>
            </View>
          </View>


          <View style={{ marginTop: "8%" }}>
            <Text style={{ color: "#000000", fontSize: 16, fontWeight: "400", marginBottom: "3%" }}>Upload Tag image</Text>

            <View style={{ height: 200, width: "100%", }}>
              <UploadDoc text={'Upload vehicle image (Front)'} />
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
    </SafeAreaView>
  )
}

export default ImageCollection
