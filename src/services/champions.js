import axios from 'axios'
const baseUrl = '/api/champions'

const getAll = () => {
    return axios.get(baseUrl)
}

export default {
    getAll: getAll
}