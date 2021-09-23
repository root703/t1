import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from 'components/common/PaginationActions'
import dayjs from 'dayjs'
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tr: {
    '&:hover': {
      background: '#f1f1f1',
      cursor: 'pointer',
    },
  },
})

const Customer = ({ customer = null }) => {
  if (!customer) return null
  const {
    first_name: firstName,
    last_name: lastName,
    phone,
    email,
    street,
    state,
    zip,
    city,
  } = customer
  const addressLineOne = street
  const addressLineTwo = `${zip}`
  return (
    <Box>
      <Typography variant='body2'>
        {firstName} {lastName}
      </Typography>
      <Typography variant='body2'>{phone}</Typography>
      <Typography variant='body2'>{email}</Typography>
      <Typography variant='body2'>{addressLineOne}</Typography>
      <Typography variant='body2'>{addressLineTwo}</Typography>
    </Box>
  )
}

const Shipping = ({ repairShop }) => {
  const { name, city, state, zip, street } = repairShop
  const addressLineOne = street
  const addressLineTwo = `${city}, ${state}, ${zip}`
  return (
    <Box>
      <Typography variant='body2'>{name}</Typography>
      <Typography variant='body2'>{addressLineOne}</Typography>
      <Typography variant='body2'>{addressLineTwo}</Typography>
    </Box>
  )
}

const Vehicle = ({ vehicle }) => {
  const {
    year,
    make,
    model,
    fluid_amount: fluidAmount,
    fluid_type: fluidType,
    vin,
    transmission_model: transmissionModel,
  } = vehicle
  const fluidMeasure = fluidType === 'QUART' ? 'Q' : 'L'
  const vehicleLineOne = `${year} ${make} ${model} ${fluidAmount}${fluidMeasure}`
  return (
    <Box>
      <Typography variant='body2'>{vehicleLineOne}</Typography>
      <Typography variant='body2'>VIN# {vin || 'N/A'}</Typography>
      <Typography variant='body2'>
        Transmission Model: {transmissionModel}
      </Typography>
    </Box>
  )
}

const Total = ({ quote }) => {
  const {
    transmission_price: transmissionPrice,
    fluid_price: fluidPrice,
    labor_price: laborPrice,
    shipping_rate: shippingCost,
  } = quote

  const transmissionAmount = 1
  const fluidAmount = quote?.vehicle?.fluid_amount
  const workTime = quote?.labor_time

  const totalCostPreTax =
    transmissionAmount * transmissionPrice +
    fluidAmount * fluidPrice +
    workTime * laborPrice +
    shippingCost
  const taxesOwed = totalCostPreTax * quote?.tax
  const totalCostAfterTax = totalCostPreTax + taxesOwed
  return (
    <Box>
      <Typography variant='body2'>
        Gross:{' '}
        {`$${totalCostPreTax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
      </Typography>
      <Typography variant='body2'>
        Tax: {`$${taxesOwed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
      </Typography>
      <Typography variant='body2'>
        Total:{' '}
        {`$${totalCostAfterTax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
      </Typography>
    </Box>
  )
}

const QuotesTable = ({ quotes = [], selectQuote }) => {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  // showing most recent quotes first
  const sortedQuotes = quotes.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <MuiTable
        className={classes.table}
        size='small'
        aria-label='a dense table'
      >
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell align='left'>Customer</TableCell>
            <TableCell align='left'>Ship To</TableCell>
            <TableCell align='left'>Vehicle</TableCell>
            <TableCell align='left'>Date</TableCell>
            <TableCell align='left'>Status</TableCell>
            <TableCell align='left'>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? sortedQuotes.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
            : sortedQuotes
          ).map(quote => {
            const {
              status: orderStatus,
              id: quoteId,
              customer,
              repair_shop: repairShop,
              tax,
              vehicle,
              created_at: createdAt,
            } = quote
            const handleRowClick = () => {
              selectQuote(quote)
            }
            return (
              <TableRow
                className={classes.tr}
                onClick={handleRowClick}
                key={quoteId}
              >
                <TableCell component='th' scope='row'>
                  {quoteId}
                </TableCell>
                <TableCell align='left'>
                  <Customer customer={customer} />
                </TableCell>
                <TableCell align='left'>
                  {repairShop && <Shipping repairShop={repairShop} />}
                </TableCell>
                <TableCell align='left'>
                  <Vehicle vehicle={vehicle} />
                </TableCell>
                <TableCell align='left'>
                  {dayjs(createdAt).format('l')}
                </TableCell>
                <TableCell align='left'>{orderStatus}</TableCell>
                <TableCell align='left'>
                  <Total quote={quote} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              count={quotes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MuiTable>
    </TableContainer>
  )
}
export default QuotesTable
