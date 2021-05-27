import React, { useState, createContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

import { loginRequest } from './authentication.service'

export const AuthecationContext = createContext()

export const AuthecationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  firebase.auth().onAuthStateChanged((u) => {
    if (u) {
      setUser(u)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  })

  const onLogin = (email, password) => {
    setIsLoading(true)

    loginRequest(email, password)
      .then((u) => {
        setUser(u)
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
        setError(e.toString())
      })
  }

  const onLogout = () => {
    setUser(null)
    firebase.auth().signOut()
  }

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError('Error: Password do not match')
      return
    }
    setIsLoading(true)
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u)
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
        setError(e.toString())
      })
  }

  return (
    <AuthecationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthecationContext.Provider>
  )
}
