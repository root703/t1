const QuickBooks = require('node-quickbooks')
const request = require('request')
const axios = require('axios')
const { v4: uuid } = require('uuid')
require('dotenv').config()

const { INTUIT_CONSUMER_KEY, INTUIT_CONSUMER_SECRET, INTUIT_REFRESH_TOKEN } =
  process.env

const INTUIT_BASE_URL = 'https://sandbox.api.intuit.com/quickbooks/v4'

const getNewTokens = () =>
  new Promise((resolve, reject) => {
    const auth = new Buffer(
      INTUIT_CONSUMER_KEY + ':' + INTUIT_CONSUMER_SECRET
    ).toString('base64')

    const postBody = {
      url: QuickBooks.TOKEN_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + auth,
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: INTUIT_REFRESH_TOKEN,
      },
    }

    request.post(postBody, (error, response, data) => {
      if (error) {
        reject(error)
        return
      }
      if (response?.body) {
        const refreshResponse = JSON.parse(response.body)
        const refreshToken = refreshResponse.refresh_token
        const accessToken = refreshResponse.access_token
        resolve({ refreshToken, accessToken })
      }
    })
  })

const processPaymentInQuickbooks = ({ amount, card }) =>
  new Promise(async (resolve, reject) => {
    const requestId = uuid()
    try {
      const { accessToken } = await getNewTokens()
      const headers = {
        Authorization: 'Bearer ' + accessToken,
        'Request-Id': requestId,
      }
      const chargeFromIntuitResponse = await axios({
        method: 'post',
        url: INTUIT_BASE_URL + '/payments/charges',
        data: {
          currency: 'USD',
          capture: true,
          amount,
          context: {
            mobile: false,
            isEcommerce: false,
          },
          card,
        },
        headers,
      })
      resolve({ paymentResponse: chargeFromIntuitResponse?.data })
    } catch (err) {
      console.log('Error Creating Charge: ', err.response.data)
      reject(err.response.data)
    }
  })

module.exports = {
  processPaymentInQuickbooks,
}
