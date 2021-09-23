const { v4 } = require('uuid')

const generateProductRoutes = (app, prisma) => {
  app
    .route('/products')
    .get(async (req, res) => {
      const { transmissionModel, fuelType } = req.query
      if (fuelType || transmissionModel) {
        // const decodedFluidTitle = fluidTitle && decodeURIComponent(fluidTitle)
        const decodedFuelType = fuelType && decodeURIComponent(fuelType)
        const decodedTransmissionModel =
          transmissionModel && decodeURIComponent(transmissionModel)
        console.log('decodedTransmissionModel', decodedTransmissionModel)
        const products = await prisma.product.findMany({
          where: {
            transmission_model: { equals: decodedTransmissionModel },
            fuel_type: { equals: decodedFuelType }
          },
        })
        res.json(products)
      } else {
        const products = await prisma.product.findMany()
        res.json(products)
      }
    })
    .post(async (req, res) => {
      const products = req.body
      const promises = products.map(async product => {
        const { handle } = product
        return prisma.product.upsert({
          where: { handle: handle || v4() },
          update: { ...product },
          create: { ...product, handle: handle || v4() },
        })
      })
      const updatedProducts = await Promise.all(promises)
      res.json(updatedProducts)
    })
    .put(async (req, res) => {
      const product = req.body
      if (product.id) {
        const productFromDb = await prisma.product.update({
          where: { id: product.id },
          data: {
            ...product,
          },
        })
        res.json(productFromDb)
      } else {
        const newProduct = await prisma.product.create({
          data: product,
        })
        res.json(newProduct)
      }
    })
    .delete(async (req, res) => {
      const product = req.body
      await prisma.product.delete({
        where: {
          id: product.id,
        },
      })
      res.json({ message: `product with id: ${product.id} deleted` })
    })
}

module.exports = generateProductRoutes
