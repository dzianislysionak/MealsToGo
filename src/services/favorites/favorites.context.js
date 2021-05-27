import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const FavoritesContext = createContext()

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavoreites] = useState([])

  const saveFavorites = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@favorites', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const loadFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('@favorites')
      if (value !== null) {
        console.log('from LS', JSON.parse(value))
        setFavoreites(JSON.parse(value))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const add = (restaurant) => {
    setFavoreites([...favorites, restaurant])
  }

  const remove = (restaurant) => {
    const newFavorites = favorites.filter(
      (x) => x.placeId !== restaurant.placeId
    )

    setFavoreites(newFavorites)
  }

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  useEffect(() => {
    loadFavorites()
  }, [])

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites: add, removeFromFavorites: remove }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
