import Axios from 'axios'
import { api } from '../api'
import { errorHandeller } from './Error'

// Index
const Index = async (header) => {
    try {
        const response = await Axios.get(`${api}dashboard`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

const Dashboard = {
    Index
}

export default Dashboard