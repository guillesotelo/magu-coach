import React, { createContext, useEffect, useState } from 'react'
import { AppContextType } from './types'
import { useHistory } from 'react-router-dom'
import { verifyToken } from './services'

export const AppContext = createContext<AppContextType>({
    isMobile: false,
    isLoggedIn: null,
    setIsLoggedIn: () => { },
})

type Props = {
    children?: React.ReactNode
}

export const AppProvider = ({ children }: Props) => {
    const isMobile = window.screen.width <= 768
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

    useEffect(() => {
        verifyUser()
    }, [])

    const verifyUser = async () => {
        const verified = await verifyToken()
        if (verified) {
            setIsLoggedIn(true)
        } else setIsLoggedIn(false)
    }

    const contextValue = React.useMemo(() => ({
        isMobile,
        setIsLoggedIn,
        isLoggedIn,
    }), [
        isMobile,
        setIsLoggedIn,
        isLoggedIn,
    ])


    return <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>
}
