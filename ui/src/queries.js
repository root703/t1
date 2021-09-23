const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const BASE_URL = IS_PRODUCTION
  ? 'http://insta-loadb-1nss69rki9qwh-7d8f1488165e1253.elb.us-west-1.amazonaws.com:5000'
  : 'http://localhost:5000'

const METHODS = {
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

export const fetchAllOrders = async () =>
  await (await fetch(BASE_URL + '/orders')).json()

export const fetchAllQuotes = async () =>
  await (await fetch(BASE_URL + '/quotes')).json()

export const fetchAllLaborPricings = async () =>
  await (await fetch(BASE_URL + '/labor')).json()

export const fetchAllProducts = async () =>
  await (await fetch(BASE_URL + '/products')).json()

export const fetchAllRepairShops = async () =>
  await (await fetch(BASE_URL + '/repair-shops')).json()

export const fetchAllLaborPricing = async () =>
  await (await fetch(BASE_URL + '/labor')).json()

export const createQuote = async ({ quote }) =>
  await (
    await fetch(BASE_URL + '/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quote),
    })
  ).json()
export const createVehicle = async ({ vehicle }) =>
  await (
    await fetch(BASE_URL + '/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    })
  ).json()
export const createCustomer = async ({ customer }) =>
  await (
    await fetch(BASE_URL + '/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
  ).json()
export const createRepairShop = async ({ shop }) =>
  await (
    await fetch(BASE_URL + '/repair-shops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shop),
    })
  ).json()
export const upsertProduct = async ({ product }) =>
  await (
    await fetch(BASE_URL + '/products', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
  ).json()
export const addProducts = async ({ products }) =>
  await (
    await fetch(BASE_URL + '/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    })
  ).json()

export const updateOrder = async ({ customer, status, quote }) =>
  await (
    await fetch(BASE_URL + '/orders', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer, status, quote }),
    })
  ).json()

export const updateLaborPrice = async ({ labor }) =>
  await (
    await fetch(BASE_URL + '/labor', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(labor),
    })
  ).json()
export const updateRepairShop = async ({ shop }) =>
  await (
    await fetch(BASE_URL + '/repair-shops', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shop),
    })
  ).json()
export const getSpecificProducts = async ({
  transmissionModel,
  fluidTitle,
}) => {
  let queryParam = ''
  if (transmissionModel && fluidTitle) {
    queryParam = `?transmissionModel=${transmissionModel}&fluidTitle=${fluidTitle}`
  } else if (transmissionModel && !fluidTitle) {
    queryParam = `?transmissionModel=${transmissionModel}`
  } else if (fluidTitle && !transmissionModel) {
    queryParam = `?fluidTitle=${fluidTitle}`
  }
  return (await fetch(BASE_URL + `/products${queryParam}`)).json()
}

export const deleteProduct = async ({ product }) =>
  await (
    await fetch(BASE_URL + '/products', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
  ).json()

export const deleteRepairShop = async ({ shop }) =>
  await (
    await fetch(BASE_URL + '/repair-shops', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shop),
    })
  ).json()
