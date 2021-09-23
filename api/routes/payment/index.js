const { processPaymentInQuickbooks } = require('./intuitHelpers')

const processPaymentRoutes = (app, prisma) => {
  app.route('/process-payment').post(async (req, res) => {
    const { billingAddress, amount, cardInfo } = req.body
    try {
      const card = {
        ...cardInfo,
        address: billingAddress,
      }
      const { paymentResponse } = await processPaymentInQuickbooks({
        amount,
        card,
      })
      res.json(paymentResponse)
    } catch (error) {
      return res.status(500).json(error)
    }
  })
}

module.exports = processPaymentRoutes
