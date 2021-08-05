import Axios from 'axios'
import swal from 'sweetalert'
import { api } from '../api'
import { errorHandeller } from './Error'

// Index of items
const Index = async (page, limit, header) => {
    try {
        const response = await Axios.get(`${api}vendor?page=${page}&limit=${limit}`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Store item
const Store = async (data, header) => {
    try {
        const response = await Axios.post(`${api}vendor`, data, header)
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
        const response = await Axios.get(`${api}vendor/${id}`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update specific item
const Update = async (id, data, header) => {
    try {
        const response = await Axios.put(`${api}vendor/${id}`, data, header)
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

// Search item
const Search = async (query, header) => {
    try {
        const response = await Axios.post(`${api}vendor/search`, query, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}


const Vendor = {
    Index,
    Store,
    Show,
    Update,
    Search
}

export default Vendor