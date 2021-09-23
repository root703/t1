import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const OrderDetailTable = ({ quote }) => {
  const classes = useStyles()

  const {
    vehicle,
    labor_time: laborTime,
    shipping_rate: shippingRate,
  } = quote

  const {
    fluid_price: fluidPrice,
    transmission_price: transmissionPrice,
    labor_price: laborPrice,
  } = quote

  const {
    transmission_model: transmissionModel,
    fluid_amount: fluidAmount,
    fluid_type: fluidType,
    fluid_title: fluidTitle,
  } = vehicle

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Item</TableCell>
            <TableCell align='left'>Cost</TableCell>
            <TableCell align='left'>Quantity</TableCell>
            <TableCell align='left'>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component='th' scope='row'>
              {transmissionModel}
            </TableCell>
            <TableCell component='th' scope='row'>
              {transmissionPrice}
            </TableCell>
            <TableCell component='th' scope='row'>
              1
            </TableCell>
            <TableCell component='th' scope='row'>
              {transmissionPrice}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>
              {fluidTitle}
            </TableCell>
            <TableCell component='th' scope='row'>
              {fluidPrice}
            </TableCell>
            <TableCell component='th' scope='row'>
              {fluidAmount}
            </TableCell>
            <TableCell component='th' scope='row'>
              {fluidAmount * fluidPrice}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>
              Labor (Hours)
            </TableCell>
            <TableCell component='th' scope='row'>
              {laborPrice}
            </TableCell>
            <TableCell component='th' scope='row'>
              {laborTime}
            </TableCell>
            <TableCell component='th' scope='row'>
              {laborTime * laborPrice}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderDetailTable
