import Axios from 'axios'
// import swal from 'sweetalert'
import { aclApi } from '../api'
import { ErrorHandeller } from './Error'

// List of items
const Role = async (header) => {
    try {
        const response = await Axios.get(`${aclApi}role`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

const Acl = {
    Role
}

export default Acl