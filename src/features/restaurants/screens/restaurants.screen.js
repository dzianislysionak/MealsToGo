import React, { useContext, useState } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper'

import { RestaurantInfoCard } from '../components/restaurant-info-card.component'
import { Spacer } from '../../../components/spacer/spacer.component'
import { SafeArea } from '../../../components/utility/safe-area.component'
import { RestaurantsContext } from '../../../services/redtaurants/restaurants.context'
import { FavoritesContext } from '../../../services/favorites/favorites.context'
import { Search } from '../components/search.component.js'
import { FavoritesBar } from '../../../components/favorites/favorites-bar.component'
import { RestaurantList } from '../components/restaurant.list.styles'
import { FadeInView } from '../../../components/animations/fade.animation'

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`

const Loading = styled(ActivityIndicator)`
  margin-left: -50px;
`

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, error, restaurants } = useContext(RestaurantsContext)
  const [isToggled, setIsToggled] = useState(false)
  const { favorites } = useContext(FavoritesContext)

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={100} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavoritesToggled={isToggled}
        onFavoriteToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavoritesBar favorites={favorites} onNavigate={navigation.navigate} />
      )}

      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail', { restaurant: item })
              }
            >
              <Spacer position='bottom' size='large'>
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  )
}
