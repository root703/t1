const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const TRANSMISSION_PRODUCT = {
  handle: 'test-handle-1',
  published: true,
  category: 'TRANSMISSION',
  transmission_model: 'TRX 5000',
  vendor: 'Vender A',
  unit_sale_price: 10,
  core_charge: 76,
}

const FLUID_PRODUCT = {
  handle: 'test-handle-2',
  published: true,
  category: 'TRANSMISSION_FLUID',
  fluid_measurement: 'QUART',
  fluid_title: 'COOL_FLUID 5S',
  unit_sale_price: 10,
}

const QUOTE = {
  status: 'QUOTE_REQUESTED',
  tax: 20,
  vehicle_id: 1,
  customer_id: 1,
  repair_shop_id: 1,
  labor_time: 12.4,
  shipping_rate: 200,
  fluid_price: 57,
  labor_price: 100,
  transmission_price: 120
}

const VEHICLE = {
  year: 1999,
  make: 'Test Make',
  model: 'Test Model',
  sub_model: 'Base',
  fluid_amount: 12.5,
  fluid_measurement: 'QUART',
  fluid_title: 'COOL_FLUID 5S',
  transmission_model: 'Trx Model 2005',
}

const seedItem = ({ table, data }) =>
  new Promise(async (resolve, reject) => {
    try {
      await prisma[table].upsert({
        where: { id: 1 },
        update: {},
        create: data,
      })
      console.log(`Added ${table} to ${table} table`)
      resolve()
    } catch (error) {
      console.log(`Error adding ${table} to ${table} table: `, error)
    }
  })

const addVehichle = () => {
  const data = VEHICLE
  return seedItem({ table: 'vehicle', data })
}

const addCustomer = () => {
  const data = {
    first_name: 'First ',
    last_name: 'Last',
    phone: 1234444444,
    email: 'someemail@email.com',
    street: '1234 Yellow Brick Rd.',
    city: 'San Diego',
    state: 'CA',
    zip: 456678,
  }
  return seedItem({ table: 'customer', data })
}

const addRepairShop = () => {
  const data = {
    name: 'Test Repair Shop',
    street: '321 Some Street Ave.',
    city: 'San Diego',
    state: 'CA',
    zip: 12345,
    service_zips: {
      set: [12345, 456789],
    },
  }
  return seedItem({ table: 'repairShop', data })
}

const addLaborPricing = () => {
  const data = {
    rate: 123.25,
  }
  return seedItem({ table: 'laborPrice', data })
}

const addQuote = () => {
  const data = QUOTE
  return seedItem({ table: 'quote', data })
}

const addOrder = () => {
  const data = {
    quote_id: 1,
  }
  return seedItem({ table: 'order', data })
}

const addProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await prisma.product.createMany({
        data: [TRANSMISSION_PRODUCT, FLUID_PRODUCT],
      })
      console.log('Added products to product table')
      resolve()
    } catch (error) {
      console.log('Error adding products: ', error)
    }
  })
}

const main = async () => {
  await addVehichle()
  await addCustomer()
  await addRepairShop()
  await addLaborPricing()
  await addProducts()
  await addQuote()
  await addOrder()
  // await assignProductToQuote()
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
