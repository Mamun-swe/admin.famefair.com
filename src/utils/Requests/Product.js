import Axios from 'axios'
import swal from 'sweetalert'
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

// Store item
const Store = async (data, header) => {
    try {
        const response = await Axios.post(`${api}product`, data, header)
        if (response.status === 201) {
            swal({
                title: "Successfully!",
                text: response.data.message,
                icon: "success",
                button: false,
            })
            return true
        }
    } catch (error) {
        if (error) {
            console.log(error.response);
            return errorHandeller(error)
        }
    }
}

// Show specific item
const Show = async (id, header) => {
    try {
        const response = await Axios.get(`${api}product/${id}`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update specific item
const Update = async (id, data, header) => {
    try {
        const response = await Axios.put(`${api}product/${id}`, data, header)
        if (response.status === 201) {
            swal({
                title: "Successfully!",
                text: response.data.message,
                icon: "success",
                button: false,
            })
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update specific item SM image
const UpdateSMImage = async (id, data, header) => {
    try {
        const response = await Axios.put(`${api}product/sm-image/${id}`, data, header)
        if (response.status === 201) {
            swal({
                title: "Successfully!",
                text: response.data.message,
                icon: "success",
                button: false,
            })
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Add new additional image
const AddAdditional = async (id, data, header) => {
    try {
        const response = await Axios.put(`${api}product/additional-image/${id}`, data, header)
        if (response.status === 201) {
            swal({
                title: "Successfully!",
                text: response.data.message,
                icon: "success",
                button: false,
            })
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Change vendor request status
const VendorRequest = async (id, header) => {
    try {
        const response = await Axios.get(`${api}product/status/${id}`, header)
        if (response.status === 201) {
            swal({
                title: "Successfully!",
                text: response.data.message,
                icon: "success",
                button: false,
            })
            return true
        }
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
    Store,
    Show,
    Update,
    UpdateSMImage,
    AddAdditional,
    VendorRequest,
    Search,
    SearchBySku
}

export default Product