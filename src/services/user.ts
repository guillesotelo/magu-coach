import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL

const getHeaders = () => {
    const { token }: { [key: string | number]: any } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    return { authorization: `Bearer ${token}` }
}
const getConfig = () => {
    const { token }: { [key: string | number]: any } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    return { headers: { authorization: `Bearer ${token}` } }
}

const loginUser = async (user: { [key: string | number]: any }) => {
    try {
        const res = await axios.post(`${API_URL}/api/user/login`, user)
        const finalUser = res.data
        localStorage.setItem('user', JSON.stringify({
            ...finalUser,
            app: 'lic-fb',
            login: new Date()
        }))
        return finalUser
    } catch (error) { console.log(error) }
}

const verifyToken = async ()=> {
    try {
        const verify = await axios.post(`${API_URL}/api/user/verify`, {}, getConfig())
        return verify.data
    } catch (err) { }
}

const registerUser = async (data: { [key: string | number]: any }) => {
    try {
        const newUser = await axios.post(`${API_URL}/api/user/create`, data)
        return newUser.data
    } catch (err) { console.error(err) }
}

const subscribe = async (data: { [key: string | number]: any }) => {
    try {
        const newEmail = await axios.post(`${API_URL}/api/app/subscribe`, data)
        return newEmail.data
    } catch (err) { console.error(err) }
}

const cancelSubscription = async (data: { [key: string | number]: any }) => {
    try {
        const canceled = await axios.post(`${API_URL}/api/app/cancelSubscription`, data)
        return canceled.data
    } catch (err) { console.error(err) }
}

const updateUser = async (data: { [key: string | number]: any }) => {
    try {
        const user = await axios.post(`${API_URL}/api/user/update`, data, getConfig())
        const localUser = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({
            ...localUser,
            ...user.data
        }))
        return user.data
    } catch (err) { console.error(err) }
}

export {
    loginUser,
    verifyToken,
    registerUser,
    updateUser,
    subscribe,
    cancelSubscription
}