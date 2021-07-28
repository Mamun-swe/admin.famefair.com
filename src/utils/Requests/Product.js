import Axios from 'axios'
import { api } from '../api'
import { errorHandeller } from './Error'

// Index of items
const Index = async (page, perPage, header) => {
    try {
        const response = await Axios.get(`${api}products?limit=${perPage}&per_page=${perPage}`, header)
        if (response.status === 200) return response
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Search with sku
const SearchBySku = async (value, header) => {
    let results
    try {
        const response = await Axios.get(`https://api.eazybest.com/api/v1/client/search/suggest/${value}`, header)
        if (response.status === 200) results = response.data.results
    } catch (error) { if (error) results = [] }

    return results
}

const Product = {
    Index,
    SearchBySku
}

export default Product