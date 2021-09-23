const generateCustomerRoutes = (app, prisma) => {
  app
    .route('/customers')
    .get(async (req, res) => {
      const customers = await prisma.customer.findMany()
      res.json(customers)
    })
    .post(async (req, res) => {
      const customer = req.body
      const newCustomer = await prisma.customer.create({
        data: customer,
      })
      res.json(newCustomer)
    })
    .put((req, res) => {
      res.send('Update an Quote')
    })
    .delete((req, res) => {
      res.send('delete an Quote')
    })
}

module.exports = generateCustomerRoutes
