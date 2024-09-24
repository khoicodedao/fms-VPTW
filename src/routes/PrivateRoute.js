import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router'
import LocalStorage from '../helpers/LocalStorage'
export default function PrivateRoute({ children, ...rest }) {
  let [check, setCheck] = useState(true)
  useEffect(() => {
    if (LocalStorage.get('user')[0].username) {
      setCheck(true)
    }
  }, [])
  return (
    <Route
      {...rest}
      render={({ location }) =>
        check ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
