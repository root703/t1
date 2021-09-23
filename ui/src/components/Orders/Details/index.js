import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Billing from './Billing'
import Shipping from './Shipping'
import DetailsTable from './Table'
import Button from '@material-ui/core/Button'
import { updateOrder } from 'queries'
import React from 'react'
import SnackBar from 'components/common/Snackbar'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const STATUSES = [
  'QUOTE_REQUESTED',
  'NEW_ORDER',
  'PENDING_ORDER',
  'SHIPPED',
  'DELIVERED',
  'IN_PROGESS',
  'COMPLETED',
]

const useStyles = makeStyles({
  wrapper: {
    paddingBottom: '4rem',
  },
  metaDataContainer: {
    margin: '1.5rem 0',
  },
  input: {
    marginRight: '1rem',
    minWidth: '15rem',
  },
  button: {
    margin: '1rem 0',
  },
})

const OrderDetail = ({ order }) => {
  const classes = useStyles()
  const {
    id: orderId,
    quote: {
      status: orderStatus,
      customer,
      repair_shop: repairShop,
      tax,
      gross_total: grossTotal,
      vehicle,
    },
    created_at: createdAt,
  } = order

  const {
    first_name: firstName,
    last_name: lastName,
    phone,
    email,
    street,
    state,
    zip,
    city,
    unit,
  } = customer

  const defaultBilling = {
    first_name: firstName,
    last_name: lastName,
    phone,
    email,
    street,
    state,
    zip,
    city,
    unit,
  }

  const [customerBilling, updateBillingInfo] = React.useState(defaultBilling)
  const [newOrderStatus, setOrderStatus] = React.useState(orderStatus)
  const [didUpdate, setUpdateStatus] = React.useState(false)

  const handleBillingUpdate = evt => {
    const value = evt.target.value
    updateBillingInfo({
      ...customerBilling,
      [evt.target.name]: value,
    })
  }

  const closeNoty = () => {
    setUpdateStatus(false)
  }

  const handleOrderUpdate = async () => {
    await updateOrder({
      customer: { ...customer, ...customerBilling },
      status: newOrderStatus,
      quote: order.quote,
    })
    setUpdateStatus(true)
  }

  const getArrivalDate = () => {
    const arrivalDate = new Date(createdAt)
    arrivalDate.setDate(arrivalDate.getDate() + 4)
    return arrivalDate
  }


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box className={classes.wrapper}>
        <Typography>Order: {orderId} details</Typography>
        <Typography>
          Payment via --payment-data-- (--payment-id--). Paid on
          --payment-date--.
        </Typography>
        <Box className={classes.metaDataContainer}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            id='date-picker-inline'
            label='Date Created'
            disabled
            value={new Date(createdAt)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <FormControl>
            <InputLabel id='status-label'>Status</InputLabel>
            <Select
              className={classes.input}
              labelId='status-label'
              value={newOrderStatus}
              onChange={e => setOrderStatus(e.target.value)}
            >
              {STATUSES.map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Billing
              customer={customerBilling}
              vehicle={vehicle}
              handleBillingUpdate={handleBillingUpdate}
            />
          </Grid>
          <Grid item xs={6}>
            <Shipping repairShop={repairShop} />
          </Grid>
        </Grid>
        <Button
          className={classes.button}
          variant='contained'
          onClick={handleOrderUpdate}
        >
          Update
        </Button>
        <Box className={classes.metaDataContainer}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            id='date-picker-inline'
            label='Estimated Arrival Date'
            disabled
            value={getArrivalDate()}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Box>
        <DetailsTable quote={order.quote} vehicle={vehicle}/>
        <Button className={classes.button} variant='contained'>
          Refund
        </Button>
        <SnackBar open={didUpdate} message='Order Updated!' close={closeNoty} />
      </Box>
    </MuiPickersUtilsProvider>
  )
}

export default OrderDetail
