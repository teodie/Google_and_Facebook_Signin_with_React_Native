import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, TextInput } from 'react-native-paper'
import { useAuth } from '@/src/hooks/useAuth';
import LoadingPage from '@/src/components/LoadingPage';

// Required for some platforms to complete the auth session
WebBrowser.maybeCompleteAuthSession();

const Loginscreen = () => {
  const { isLoadingUser,  signInWithFacebook, signInWithGoogle } = useAuth()

  if(isLoadingUser) return  <LoadingPage />

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className='bg-[#D9D9D9] flex-1'>
        <View className='bg-white'>
          <View className='items-center h-56 justify-end bg-[#D9D9D9] rounded-bl-[35px]'>
            <Image
              source={require('../../assets/images/street.png')}
              width={100}
              height={100}
            />
          </View>
        </View>
        <View className='flex-1 rounded-tr-[35px] bg-white px-8 '>
          <View className='py-8'>
            <Text className='text-2xl text-black-900 font-bold'>Welcome Back!</Text>
            <Text className='text-neutral-500'>Hello there! login to continue.</Text>
          </View>
          <View className=' h-14 gap-3 flex-row mb-10 '>
            <TouchableOpacity 
            disabled={isLoadingUser}
            onPress={signInWithGoogle}
            className='flex flex-auto border border-gray-500 h-full rounded-full items-center justify-center flex-row gap-2'>
              <Image
                source={require('../../assets/images/devicon_google.png')}
                className='h-5 w-5'
                resizeMode='contain'
              />
              <Text className='text-neutral-500'>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isLoadingUser}
              onPress={signInWithFacebook}
              className='flex flex-auto bg-[#21399B] h-full rounded-full items-center justify-center flex-row gap-2'>
              <Image
                source={require('../../assets/images/facebook_icon.png')}
                className='h-5 w-5'
                resizeMode='contain'
              />
              <Text className='text-white'>facebook</Text>
            </TouchableOpacity>
          </View>
          <Text className='flex text-center text-neutral-500 mb-5'>or sign with</Text>
          <View>
            <View className='gap-2'>
              <Text className='text-xl'>Email Address</Text>
              <TextInput
                style={{ height: 50 }}
                outlineStyle={{ borderRadius: 50 }}
                mode='outlined'
              />
            </View>
            <View className='gap-2'>
              <Text className='text-xl'>Password</Text>
              <TextInput
                style={{ height: 50 }}
                outlineStyle={{ borderRadius: 50 }}
                mode='outlined'
                right={<TextInput.Icon icon="eye" />}
              />
            </View>
          </View>
          <View className='items-end mb-5'>
            <Button mode='text'>Forgot password?</Button>
          </View>
          <View className='mt-auto'>
            <TouchableOpacity disabled={isLoadingUser} className='h-14 rounded-full  bg-[#21399B] items-center justify-center'>
              <Text className='text-white text-xl'>Login</Text>
            </TouchableOpacity>
            <View className='flex-row items-center'>
              <Text>Don't have an account?</Text>
              <Button mode='text'>Sign Up</Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Loginscreen