import Axios from 'axios'
import { authApi } from '../api'
import { errorHandeller } from './Error'

// Login
const Login = async (data) => {
    try {
        const response = await Axios.post(`${authApi}login`, data)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

const Auth = {
    Login
}

export default Auth