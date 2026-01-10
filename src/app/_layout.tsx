import '@/global.css'
import { Stack } from 'expo-router'
import { AuthProvider } from '@/src/utils/auth-context';

export default function RootLayout() {

  return (
    <AuthProvider>
      <Stack>
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen name='(protected)' options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  )
}