const generateOrderRoutes = (app, prisma) => {
  app
    .route('/shipping-info')
    .get(async (req, res) => {
      res.send('get a shipping info')
    })
    .post(async (req, res) => {
      const shippingInfo = req.body
      const newShippingInfo = await prisma.shippingInfo.create({
        data: shippingInfo,
      })
      res.json({ shippingInfo: newShippingInfo })
    })
    .put(async (req, res) => {
      res.send('update a shipping info')
    })
    .delete((req, res) => {
      res.send('delete a shipping info')
    })
}

module.exports = generateOrderRoutes
