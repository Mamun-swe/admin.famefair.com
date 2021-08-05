import Axios from 'axios'
import swal from 'sweetalert'
import { api } from '../api'
import { errorHandeller } from './Error'

// Index of items
const Index = async (page, limit, header) => {
    try {
        const response = await Axios.get(`${api}brand?page=${page}&limit=${limit}`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Store item
const Store = async (data, header) => {
    try {
        const response = await Axios.post(`${api}brand`, data, header)
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

// Show specific item
const Show = async (id, header) => {
    try {
        const response = await Axios.get(`${api}brand/${id}`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update specific item
const Update = async (id, data, header) => {
    try {
        const response = await Axios.put(`${api}brand/${id}`, data, header)
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

// Delete item
const Delete = async (id, header) => {
    try {
        const response = await Axios.delete(`${api}brand/${id}`, header)
        if (response.status === 200) {
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
        const response = await Axios.post(`${api}brand/search`, query, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

const Brand = {
    Index,
    Store,
    Show,
    Update,
    Delete,
    Search
}

export default Brand