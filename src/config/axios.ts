import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:5000/data',
    headers: {
        'Access-Control-Allow-Headers' : '*',
        'Access-Control-Allow-Origin' : '*'
    }
})

export default http