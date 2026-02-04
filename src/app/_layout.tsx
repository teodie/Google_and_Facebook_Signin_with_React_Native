import '../../global.css'
import { Stack } from 'expo-router'
import { AuthProvider } from '@/src/utils/auth-context';
import { useAuth } from '../hooks/useAuth';

export function RoutGaurd() {
  const { session } = useAuth()

  const isStorybook = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true"
  return (
    isStorybook
      ?
      <Stack>
        <Stack.Screen name='storybook' options={{ headerShown: false }} />
      </Stack>
      :
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