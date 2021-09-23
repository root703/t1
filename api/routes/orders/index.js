const generateOrderRoutes = (app, prisma) => {
  app
    .route('/orders')
    .get(async (req, res) => {
      const orders = await prisma.order.findMany({
        include: {
          quote: {
            select: {
              id: true,
              customer: true,
              repair_shop: true,
              vehicle: true,
              tax: true,
              status: true,
              labor_time: true,
              shipping_rate: true,
              labor_price: true,
              fluid_price: true,
              transmission_price: true,
            },
          },
        },
      })
      res.json(orders)
    })
    .post(async (req, res) => {
      const quote = req.body
      const newOrder = await prisma.order.create({
        data: {
          quote_id: quote.id,
        },
      })
      res.json({ order: { ...newOrder, quote } })
    })
    .put(async (req, res) => {
      const { customer, status, quote } = req.body
      const updatedCustomer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          ...customer,
          zip: Number(customer.zip),
          phone: Number(customer.phone),
        },
      })
      const updatedOrder = await prisma.quote.update({
        where: { id: quote.id },
        data: {
          status,
        },
      })
      res.json({ customer: updatedCustomer, order: updatedOrder })
    })
    .delete((req, res) => {
      res.send('delete an order')
    })
}

module.exports = generateOrderRoutes
