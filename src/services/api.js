import * as AxiosLogger from 'axios-logger'
const baseUrl = ''

const axios = require('axios')
axios.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
axios.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);

const connectRouter = async ({ routerId }) => {
  const res = await axios.post(`${baseUrl}/telnet`, { routerId })
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

const configStaticRoute = async ({ connection_id, interfaceNum, ip_addr, netMask }) => {
  const res = await axios.post(`${baseUrl}/ipRoute`, { connection_id, interfaceNum, ip_addr, netMask })
  return res.data
}

const testPing = async ({ connection_id, ip_addr }) => {
  const res = await axios.post(`${baseUrl}/testPing`, { connection_id , ip_addr })
  return res.data
}

const sendCommand = async ({connection_id, command}) => {
  const res = await axios.post(`${baseUrl}/sendCommand`, { connection_id , command })
  return res.data
}

export default {
  connectRouter,
  configIPAddr,
  configOSPFArea,
  configStaticRoute,
  testPing,
  sendCommand
}