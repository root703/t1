const generateQuoteRoutes = (app, prisma) => {
  app
    .route('/quotes')
    .get(async (req, res) => {
      const quotes = await prisma.quote.findMany({
        include: {
          customer: true,
          repair_shop: true,
          vehicle: true,
        },
      })
      res.json(quotes)
    })
    .post(async (req, res) => {
      const quote = req.body
      const newQuote = await prisma.quote.create({
        data: quote,
      })
      res.json(newQuote)
    })
    .put(async (req, res) => {
      const quote = req.body
      const newQuote = await prisma.quote.update({
        where: { id: quote.id },
        data: quote
      })
      res.json(newQuote)
    })
    .delete((req, res) => {
      res.send('delete an Quote')
    });
  app
    .route('/quote/:id')
    .get(async (req, res) => {
      const quoteId = Number(req.params.id)
      const customerId = Number(req.query.customerId)
      const vehicleId = Number(req.query.vehicleId)
      const quotes = await prisma.quote.findMany({
        where: { id: quoteId, customer_id: customerId, vehicle_id: vehicleId },
        include: {
          customer: true,
          repair_shop: true,
          vehicle: true,
          shipping_info: true
        },
      })
      res.json(quotes[0])
    })
}

module.exports = generateQuoteRoutes
