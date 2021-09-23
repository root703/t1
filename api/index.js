const express = require('express')
const cors = require('cors')

const orderRoutes = require('./routes/orders')
const laborRoutes = require('./routes/laborPricing')
const productRoutes = require('./routes/products')
const quoteRoutes = require('./routes/quotes')
const repairShopRoutes = require('./routes/repairShops')
const customerRoutes = require('./routes/customer')
const vehicleRoutes = require('./routes/vehicle')
const paymentRoutes = require('./routes/payment')
const shippingInfoRoutes = require('./routes/shippingInfo')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()

const PORT = 5000

app.use(cors())
app.use(express.json())

// create routes
orderRoutes(app, prisma)
laborRoutes(app, prisma)
productRoutes(app, prisma)
quoteRoutes(app, prisma)
repairShopRoutes(app, prisma)
customerRoutes(app, prisma)
vehicleRoutes(app, prisma)
paymentRoutes(app, prisma)
shippingInfoRoutes(app, prisma)

app.listen(PORT, () => {
  console.log(`running on port ${PORT}.`)
})
