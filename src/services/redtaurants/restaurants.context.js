import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useContext,
} from 'react'

import { restaurantsRequest, restaurantTransform } from './restaurants.service'
import { LocationContext } from '../location/location.context'

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestauranst] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { location } = useContext(LocationContext)

  const retrieveRestaurants = (loc) => {
    setIsLoading(true)
    setRestauranst([])
    setTimeout(() => {
      restaurantsRequest(loc)
        .then(restaurantTransform)
        .then((results) => {
          setIsLoading(false)
          setRestauranst(results)
        })
        .catch((err) => {
          setError(err)
        })
    }, 2000)
  }

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`
      retrieveRestaurants(locationString)
    }
  }, [location])
  return (
    <RestaurantsContext.Provider value={{ restaurants, isLoading, error }}>
      {children}
    </RestaurantsContext.Provider>
  )
}
