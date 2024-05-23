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

const getAllServices = async () => {
    try {
        const services = await axios.get(`${API_URL}/api/service/getAll`, { headers: getHeaders() })
        return services.data
    } catch (err) { console.log(err) }
}

const getServiceById = async (_id: string) => {
    try {
        const service = await axios.get(`${API_URL}/api/service/getById`, { params: { _id }, headers: getHeaders() })
        return service.data
    } catch (err) { console.log(err) }
}

const createService = async (data: { [key: string | number]: any }) => {
    try {
        const service = await axios.post(`${API_URL}/api/service/create`, data, getConfig())
        return service.data
    } catch (err) { console.log(err) }
}

const updateService = async (data: { [key: string | number]: any }) => {
    try {
        const service = await axios.post(`${API_URL}/api/service/update`, data, getConfig())
        return service.data
    } catch (err) { console.log(err) }
}

const deleteService = async (data: { [key: string | number]: any }) => {
    try {
        const deleted = await axios.post(`${API_URL}/api/service/remove`, data, getConfig())
        return deleted.data
    } catch (err) { console.log(err) }
}

export {
    getAllServices,
    createService,
    getServiceById,
    updateService,
    deleteService,
}