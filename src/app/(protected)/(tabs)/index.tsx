import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '@/src/hooks/useAuth';

export default function Home() {
  const { session, signOut } = useAuth()

  const userAvatar = session?.user.user_metadata.avatar_url
  const userName = session?.user.user_metadata.name
  const userEmail = session?.user.user_metadata.email

  return (
    
    <SafeAreaView className='flex-1 items-center justify-center'>
      <Image src={ userAvatar } height={80} width={80} className='rounded-full' />
      <Text className='text-xl text-blue-400'>Welcome!</Text>
      <Text className='text-xl '>Name: {userName}</Text>
      <Text className='text-xl mb-5'>Email: {userEmail}</Text>
      <Button mode='contained' onPress={signOut}>log out</Button>
    </SafeAreaView>
  )
}

