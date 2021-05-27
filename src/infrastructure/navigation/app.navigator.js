import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Text, Button } from 'react-native'

import { RestaurantsNavigator } from './restaurants.navigation'
import { SafeArea } from '../../components/utility/safe-area.component'
import { MapScreen } from '../../features/map/screens/map.screen'
import { AuthecationContext } from '../../services/authentication/authentication.context'

const Tab = createBottomTabNavigator()

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
  Settings: 'md-settings',
}

const Settings = () => {
  const { onLogout } = useContext(AuthecationContext)
  return (
    <SafeArea>
      <Text>Settings</Text>
      <Button title='Logout' onPress={() => onLogout()} />
    </SafeArea>
  )
}

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name]
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  }
}

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='Restaurants' component={RestaurantsNavigator} />
      <Tab.Screen name='Map' component={MapScreen} />
      <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  )
}
