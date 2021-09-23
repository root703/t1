const generateLaborPricingRoutes = (app, prisma) => {
  app
    .route('/labor')
    .get(async (req, res) => {
      const laborPrices = await prisma.laborPrice.findMany()
      res.json(laborPrices)
    })
    .post((req, res) => {
      res.send('create a Labor')
    })
    .put(async (req, res) => {
      const laborPrice = req.body
      const updatePricing = await prisma.laborPrice.update({
        where: { id: laborPrice.id },
        data: {
          ...laborPrice,
        },
      })
      res.json(updatePricing)
    })
    .delete((req, res) => {
      res.send('delete an Labor')
    })
}

module.exports = generateLaborPricingRoutes
