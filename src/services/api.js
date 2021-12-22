const axios = require('axios')
const baseUrl = ''

const connectRouter = async (routerId) => {
  const res = await axios.post(`${baseUrl}/telnet/${routerId}`)
  return res.data
}

const configIPAddr = (reqBody) => {
  return axios.post(`${baseUrl}/interface`, reqBody)
}

const configOSPFArea = (reqBody) => {
  return axios.post(`${baseUrl}/network`, reqBody)
}

const getIPRoutingTable = (reqBody) => {
  return axios.get(`${baseUrl}/showRoute`, reqBody)
}

export default {
  connectRouter,
  configIPAddr,
  configOSPFArea,
  getIPRoutingTable
}
