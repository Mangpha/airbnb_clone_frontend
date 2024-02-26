import axios from 'axios'


const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
})

export const getRooms = () =>
  instance.get('rooms/').then((res) => res.data).catch((err) => console.log(err))

export const getRoom = () =>
  instance.get(`rooms/3`).then((res) => res.data).catch((err) => console.log(err))