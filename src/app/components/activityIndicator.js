import React from 'react';
import LottieView from 'lottie-react-native'
import { StyleSheet, View } from 'react-native'

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <LottieView autoPlay loop source={require('../../assets/animations/loader.json')} />
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: '#000',
    height: '100%',
    opacity: 0.6,
    width: '100%',
    zIndex: 1
  }
})

export default ActivityIndicator;