import { makeRedirectUri } from "expo-auth-session";
import { supabase } from "./supabase";
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Session } from '@supabase/supabase-js';
import { createContext, ReactNode, useEffect, useState } from "react";
import { router } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  session: Session | null
  isLoadingUser: boolean
  signOut: () => Promise<void>
  signInWithFacebook: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false)

  const redirectTo = makeRedirectUri()

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    setIsLoadingUser(true)

    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) throw new Error(`Error fetching session: ${error}`)

    setSession(session)

    setIsLoadingUser(false)
  }

  const signInWithFacebook = async () => {
    console.log("signin with facebook")
    setIsLoadingUser(true)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      }
    })

    if (error) throw error

    const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

    if (res.type === 'success') {
      const { url } = res
      const fixedUrl = url.replace('#', '?');

      const parsed = Linking.parse(fixedUrl);

      const token = parsed.queryParams?.access_token;
      const refresh = parsed.queryParams?.refresh_token;

      if (token && refresh) {
        await supabase.auth.setSession({
          access_token: token as string,
          refresh_token: refresh as string,
        })
      }
    }

    await getUser()

    setIsLoadingUser(false)

    router.replace('/')
  }

  const signInWithGoogle = async () => {
    console.log("google Oauth started")
    setIsLoadingUser(true)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      }
    })


    if (error) throw error

    const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo, { showInRecents: true })

    if (res.type === 'success') {
      const { url } = res
      const fixedUrl = url.replace('#', '?');

      const parsed = Linking.parse(fixedUrl);

      const token = parsed.queryParams?.access_token;
      const refresh = parsed.queryParams?.refresh_token;

      if (token && refresh) {
        await supabase.auth.setSession({
          access_token: token as string,
          refresh_token: refresh as string,
        })
      }
    }

    await getUser()

    setIsLoadingUser(false)

    router.replace('/')
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ session, isLoadingUser, signOut, signInWithFacebook, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )

}

