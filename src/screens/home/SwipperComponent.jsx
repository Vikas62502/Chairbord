import React from 'react'
import { Text, Dimensions, StyleSheet, View } from 'react-native'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

const SwipperComponent = () => {
  const colors = ['1', '2', '3', '4']
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={2}
        showPagination
        paginationStyle={{
          bottom: -40
        }}
        paginationActiveDotColor={'blue'} // Change active dot color
        paginationDefaultColor={'gray'} // Change inactive dot color
        paginationDotStyle={styles.paginationDot} // Apply custom styles to pagination dots
        data={colors}
        renderItem={({ item }) => (
          <View style={[styles.child, { backgroundColor: 'white' }]}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
      />
    </View>
  )
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white'
  },
  child: {
    width,
    justifyContent: 'center'
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center'
  },
  paginationDot: {
    width: 10, // Adjust dot width as needed
    height: 10, // Adjust dot height as needed
    borderRadius: 5, // Make dots circular
    marginHorizontal: 5 // Add space between dots
  }
})

export default SwipperComponent
