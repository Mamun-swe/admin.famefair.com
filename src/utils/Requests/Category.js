import Axios from 'axios'
import { api } from '../api'
import { errorHandeller } from './Error'

// Index of items
const Index = async (header) => {
    try {
        const response = await Axios.get(`${api}products/categories`, header)
        if (response.status === 200) return response
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

const Category = {
    Index
}

export default Category