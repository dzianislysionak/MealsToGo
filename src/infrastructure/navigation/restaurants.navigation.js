import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { RestaurantsScreen } from '../../features/restaurants/screens/restaurants.screen'
import { RestaurantDetailScreen } from '../../features/restaurants/screens/restaurant-detail.screen'

const RestaurantStack = createStackNavigator()

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator headerMode='none'>
      <RestaurantStack.Screen
        name='Restaurants'
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name='RestaurantDetail'
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  )
}
