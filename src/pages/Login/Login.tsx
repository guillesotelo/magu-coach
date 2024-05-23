import React, { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'
import { APP_COLORS } from '../../constants'
import InputField from '../../components/InputField/InputField'
import { onChangeEventType } from '../../types'
import { AppContext } from '../../AppContext'
import { toast } from 'react-toastify'
import { loginUser } from '../../services'

type Props = {}

export default function Login({ }: Props) {
    const [data, setData] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [dataOk, setDataOk] = useState(false)
    const history = useHistory()
    const { setIsLoggedIn, isLoggedIn } = useContext(AppContext)

    useEffect(() => {
        setDataOk(checkData())
    }, [data])

    const updateData = (key: string, e: onChangeEventType) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const login = async () => {
        try {
            setLoading(true)
            const logged = await loginUser(data)
            if (logged) {
                setIsLoggedIn(true)
                toast.success(`Hola ${logged.username ? logged.username.split(' ')[0] : ''}!`)
                setTimeout(() => {
                    setIsLoggedIn(true)
                    history.push('/')
                }, 2000)
            }
            else toast.error('Ocurrió un error. Intenta nuevamente.')
            setLoading(false)
        } catch (err) {
            toast.error('Ocurrió un error. Intenta nuevamente.')
            console.error(err)
            setLoading(false)
        }
    }

    const checkData = () => {
        if (data.email &&
            data.password &&
            data.email.includes('@') &&
            data.email.includes('.') &&
            data.password.length >= 4) return true
        return false
    }

    return (
        <div className="login__container">
            <div className="login__box">
                <h1 className='login__title'>¡Qué bueno es verte de nuevo!</h1>
                <div className="login__form">
                    <InputField
                        label='Email'
                        value={data.email}
                        name='email'
                        updateData={updateData}
                    />
                    <InputField
                        label='Password'
                        value={data.password}
                        name='password'
                        updateData={updateData}
                        type='password'
                    />
                </div>

                <div className="login__btns">
                    <Button
                        bgColor={APP_COLORS.SALMON}
                        label='Iniciar sesión'
                        disabled={loading || !dataOk || Boolean(isLoggedIn)}
                        handleClick={login} />
                    <Button
                        bgColor='lightgray'
                        textColor='black'
                        label='Volver'
                        disabled={loading || Boolean(isLoggedIn)}
                        handleClick={() => history.goBack()} />
                </div>
            </div>
        </div>
    )
}