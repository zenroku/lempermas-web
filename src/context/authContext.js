import React, { createContext, useState } from 'react'

export const LoginContext = createContext()

export const LoginContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false)

    return (
        <LoginContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </LoginContext.Provider>
    )
}