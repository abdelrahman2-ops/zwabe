import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const agodaClient = axios.create({
  baseURL: 'http://affiliateapi7643.agoda.com/affiliateservice/lt_v1',
  headers: {
    'Accept-Encoding': 'gzip,deflate',
    'Content-Type': 'application/json',
    'Authorization': `${process.env.AGODA_SITE_ID}:${process.env.AGODA_API_KEY}`
  }

})

export default agodaClient
