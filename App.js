import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components/native'
import firebase from 'firebase/app'

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald'
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato'

import { theme } from './src/infrastructure/theme'
import { AuthecationContextProvider } from './src/services/authentication/authentication.context'
import { Navigation } from './src/infrastructure/navigation/index'

const firebaseConfig = {
  apiKey: 'AIzaSyA0p76o4pc2vZSUkgm-xNje7fH1hG48jtU',
  authDomain: 'mealstogo-79f46.firebaseapp.com',
  projectId: 'mealstogo-79f46',
  storageBucket: 'mealstogo-79f46.appspot.com',
  messagingSenderId: '551944422823',
  appId: '1:551944422823:web:4f973074e7e68918066282',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  })
  const [latoLoaded] = useLato({
    Lato_400Regular,
  })

  if (!oswaldLoaded || !latoLoaded) {
    return null
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthecationContextProvider>
          <Navigation />
        </AuthecationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style='auto' />
    </>
  )
}
