import * as AxiosLogger from 'axios-logger'
const baseUrl = ''

const axios = require('axios')
axios.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
axios.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);

const connectRouter = async ({ routerId }) => {
  const res = await axios.post(`${baseUrl}/telnet/`, { routerId })
  return res.data
}

const configIPAddr = async ({ connection_id, interfaceNum, ip_addr, netMask }) => {
  const res = await axios.post(`${baseUrl}/interface`, { connection_id, interfaceNum, ip_addr, netMask })
  return res.data
}

const configOSPFArea = async ({ connection_id, ospf_id, area_id, ip_addr, netMask }) => {
  const res = await axios.post(`${baseUrl}/ospf`, { connection_id, ospf_id, area_id, ip_addr, netMask })
  return res.data
}

const getIPRoutingTable = (reqBody) => {
  return axios.get(`${baseUrl}/showRoute`, reqBody)
}

const configStaticRoute = async ({ connection_id, interfaceNum, ip_addr, netMask }) => {
  const res = await axios.post(`${baseUrl}/ipRoute`)
  return res.data
}

export default {
  connectRouter,
  configIPAddr,
  configOSPFArea,
  // getIPRoutingTable,
  configStaticRoute
}
