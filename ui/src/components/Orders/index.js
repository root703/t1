import Box from '@material-ui/core/Box'
import OrdersTable from './Table'
import Typography from '@material-ui/core/Typography'
import { useQuery } from 'react-query'
import { fetchAllOrders } from 'queries'
import OrderDetail from 'components/Orders/Details'
import React from 'react'
import Export from './Export'

const Orders = ({ selectedOrder, setSelectedOrder }) => {
  const {
    isLoading,
    error,
    data: orders,
    isFetching,
  } = useQuery('/orders', fetchAllOrders)

  const onRowClick = order => {
    setSelectedOrder(order)
  }

  if (selectedOrder) {
    return (
      <Box>
        <Typography variant='h4'>Order Details</Typography>
        <OrderDetail order={selectedOrder}/>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant='h4'>Orders</Typography>
      <Export orders={orders}/>
      <OrdersTable orders={orders} onRowClick={onRowClick} />
    </Box>
  )
}

export default Orders
