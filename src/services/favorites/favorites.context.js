import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AuthecationContext } from '../authentication/authentication.context'

export const FavoritesContext = createContext()

export const FavoritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthecationContext)
  const [favorites, setFavoreites] = useState([])

  const saveFavorites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const loadFavorites = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@favorites-${uid}`)
      
      if (value != null) {
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
    if (user && user.uid && favorites.length) {
      saveFavorites(favorites, user.uid)
    }
  }, [favorites, user])

  useEffect(() => {
    if (user && user.uid) {
      loadFavorites(user.uid)
    }
  }, [user])

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites: add, removeFromFavorites: remove }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
