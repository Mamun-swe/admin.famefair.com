import Axios from 'axios'
// import swal from 'sweetalert'
import { api } from '../api'
import { errorHandeller } from './Error'

// Index of items
const Index = async (page, limit, header) => {
    try {
        const response = await Axios.get(`${api}product?page=${page}&limit=${limit}`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Search item
const Search = async (query, header) => {
    try {
        const response = await Axios.post(`${api}product/search`, query, header)
        if (response.status === 200) return response.data
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
    Search,
    SearchBySku
}

export default Product