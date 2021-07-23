import Axios from 'axios'
import { api } from '../api'
import { errorHandeller } from './Error'

// Index of items
const Index = async (page, perPage, header) => {
    try {
        const response = await Axios.get(`${api}users?limit=${perPage}&per_page=${perPage}`, header)
        if (response.status === 200) return response
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

const Product = {
    Index
}

export default Product