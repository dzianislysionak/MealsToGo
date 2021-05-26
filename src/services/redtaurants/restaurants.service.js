import { mocks } from './mock/index'
import camelize from 'camelize'

export const restaurantsRequest = (location = '37.7749295,-122.4194155') => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location]
    if (!mock) {
      reject('not found')
    }

    resolve(mock)
  })
}

const restaurantTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARLY',
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
    }
  })
  return camelize(mappedResults)
}
