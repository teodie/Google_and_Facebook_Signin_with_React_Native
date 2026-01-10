import '@/global.css'
import { Stack } from 'expo-router'
import { AuthProvider } from '@/src/utils/auth-context';
import { useAuth } from '../hooks/useAuth';

export function RoutGaurd() {
  const { session } = useAuth()

  return (
    <Stack>
      <Stack.Protected guard={session === null}>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={session !== null}>
        <Stack.Screen name='(protected)' options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  )
}

export default function RootLayout() {

  return (
    <AuthProvider>
      <RoutGaurd />
    </AuthProvider>
  )
}