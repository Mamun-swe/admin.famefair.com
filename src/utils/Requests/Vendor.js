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

// Show specific item
const Show = async (id, header) => {
    try {
        const response = await Axios.get(`${api}users/${id}`, header)
        if (response.status === 200) return response
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

const Vendor = {
    Index,
    Show
}

export default Vendor