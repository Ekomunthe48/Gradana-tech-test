import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://kodepos-2d475.firebaseio.com/'
})

export default instance
