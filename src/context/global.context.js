import React, { createContext, useState } from 'react'

// Initiate Context
const GlobalContext = createContext()
// Provide Context
export const GlobalProvider = ({ children }) => {
  const [global, setGlobal] = useState({})
  return (
    <GlobalContext.Provider value={{ global, setGlobal }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
