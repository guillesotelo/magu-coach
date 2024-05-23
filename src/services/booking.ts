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

const getAllBookings = async () => {
    try {
        const bookings = await axios.get(`${API_URL}/api/booking/getAll`, { headers: getHeaders() })
        return bookings.data
    } catch (err) { console.log(err) }
}

const getBookingById = async (_id: string) => {
    try {
        const booking = await axios.get(`${API_URL}/api/booking/getById`, { params: { _id }, headers: getHeaders() })
        return booking.data
    } catch (err) { console.log(err) }
}

const createBooking = async (data: { [key: string | number]: any }) => {
    try {
        const booking = await axios.post(`${API_URL}/api/booking/create`, data, getConfig())
        return booking.data
    } catch (err) { console.log(err) }
}

const updateBooking = async (data: { [key: string | number]: any }) => {
    try {
        const booking = await axios.post(`${API_URL}/api/booking/update`, data, getConfig())
        return booking.data
    } catch (err) { console.log(err) }
}

const deleteBooking = async (data: { [key: string | number]: any }) => {
    try {
        const deleted = await axios.post(`${API_URL}/api/booking/remove`, data, getConfig())
        return deleted.data
    } catch (err) { console.log(err) }
}

export {
    getAllBookings,
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking,
}