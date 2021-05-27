import React, { useState } from 'react'
import { List } from 'react-native-paper'
import { ScrollView } from 'react-native'

import { RestaurantInfoCard } from '../components/restaurant-info-card.component'
import { SafeArea } from '../../../components/utility/safe-area.component'

export const RestaurantDetailScreen = ({ route }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false)
  const [launchExpanded, setLaunchExpanded] = useState(false)
  const [dinnerExpanded, setDinnerExpanded] = useState(false)
  const [drinksExpanded, setDrinksExpanded] = useState(false)

  const { restaurant } = route.params

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.Accordion
          title='Breakfast'
          left={(props) => <List.Icon {...props} icon='bread-slice' />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <List.Item title='Eggs' />
          <List.Item title='Classic Breakfast' />
        </List.Accordion>
        <List.Accordion
          title='Launch'
          left={(props) => <List.Icon {...props} icon='hamburger' />}
          expanded={launchExpanded}
          onPress={() => setLaunchExpanded(!launchExpanded)}
        >
          <List.Item title='Soup' />
          <List.Item title='Meet' />
          <List.Item title='Potatoes' />
        </List.Accordion>
        <List.Accordion
          title='Dinner'
          left={(props) => <List.Icon {...props} icon='food-variant' />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title='Chicken' />
          <List.Item title='Porrage' />
        </List.Accordion>
        <List.Accordion
          title='Drinks'
          left={(props) => <List.Icon {...props} icon='cup' />}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <List.Item title='Milk' />
          <List.Item title='Juise' />
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  )
}
