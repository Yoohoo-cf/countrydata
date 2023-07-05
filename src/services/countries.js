import axios from 'axios';

const getAll = () => {
    const request = axios.get(`https://restcountries.com/v3.1/all`)
    return request.then(response => response.data)
}

const getSingle = (name) => {
    const request = axios.get(`https://restcountries.com/v3.1/name/${name}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    getSingle
}