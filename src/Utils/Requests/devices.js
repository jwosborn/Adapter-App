import axios from 'axios'

export const getDevices = () => {
  return axios.get('https://adapter-api.herokuapp.com/api/devices')
}

export const getDevice = device => {
  return axios.get(`https://adapter-api.herokuapp.com/api/devices/${device}`)
}
