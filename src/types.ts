export type dataObj<T = any> = Record<string | number, T>

export type AppContextType = {
    isMobile: boolean
    isLoggedIn: boolean | null
    setIsLoggedIn: (value: boolean) => void
}

export type userType = {
    _id?: string
    username?: string
    email?: string
    password?: string
    password2?: string
    isSuper?: boolean
    newData?: userType
}

export type onChangeEventType = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>