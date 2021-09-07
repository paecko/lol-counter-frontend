import axios from 'axios'
const baseUrl = '/api/statistics'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response
}

const get = async (champ) => {
    const response = await axios.get(`${baseUrl}/${champ}`)
    return response.data
}

export default {
    getAll: getAll,
    get: get
}