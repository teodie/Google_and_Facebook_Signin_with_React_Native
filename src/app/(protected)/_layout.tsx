import { useAuth } from "@/src/hooks/useAuth";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
 const { session } = useAuth()
 
//  if( !session ) return <Redirect href={"/login"} /> 

  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}