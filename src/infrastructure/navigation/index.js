import React, { useContext } from 'react'
import { AuthecationContext } from '../../../src/services/authentication/authentication.context'

import { AppNavigator } from './app.navigator'
import { AccoutNavigator } from './account.navigator'
import { NavigationContainer } from '@react-navigation/native'

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthecationContext)

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccoutNavigator />}
    </NavigationContainer>
  )
}
