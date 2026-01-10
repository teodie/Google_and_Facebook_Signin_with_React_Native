import { View, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingPage = () => {
  return (
    <View className='flex-1 items-center justify-center'>
      <ActivityIndicator />
    </View>
  )
}

export default LoadingPage