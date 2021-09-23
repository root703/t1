import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import LineItem from './LineItem'
import dayjs from 'dayjs'

const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const useStyles = makeStyles({
  lineItemWrapper: {
    margin: '1rem 0',
  },
  lineItem: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '.5rem 0',
  },
  lineItemTitle: {
    fontWeight: 'bold',
  },
  lineItemSubLabel: {
    fontStyle: 'italic',
  },
  lineItemPrice: {
    fontWeight: 'bold',
  },
})

const LineItems = ({
  quote,
  warrantyPrice,
  shippingCost,
  taxRate,
  warrantyType,
  workTime,
  transmissionAmount,
  fluidAmount,
  taxesOwed,
}) => {
  const classes = useStyles()

  const {
    transmission_price: transmissionPrice,
    fluid_price: fluidPrice,
    labor_price: laborPrice,
    vehicle,
    additional_info
  } = quote

  const fluidGrade = vehicle.fluid_title
  const transmissionModel = vehicle?.transmission_model

  return (
    <Box className={classes.lineItemWrapper}>
      <LineItem
        label={`Re-Manufactured Transmission Assembly (${transmissionModel})`}
        quantity={transmissionAmount}
        price={transmissionPrice}
        type='transmission'
        additionalInfo={additional_info}
      />
      <LineItem
        label={`Fluid (${fluidGrade})`}
        quantity={fluidAmount}
        price={fluidPrice}
        type='fluid'
      />
      <LineItem
        label='Labor Cost'
        type='hour'
        quantity={workTime}
        price={laborPrice}
      />
      <LineItem
        label='Shipping'
        quantity='1'
        type='each'
        price={shippingCost}
      />
      <LineItem label='Towing' quantity='1' type='each' />
      {warrantyType === 'upgrade' && (
        <LineItem
          label='Upgraded Warranty'
          quantity='1'
          price={warrantyPrice}
        />
      )}
      <Box className={classes.lineItem}>
        <Box>
          <Typography className={classes.lineItemTitle}>Tax</Typography>
          <Typography className={classes.lineItemSubLabel}>
            {taxRate * 100}%
          </Typography>
        </Box>
        <Typography className={classes.lineItemPrice}>
          ${taxesOwed.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </Typography>
      </Box>
    </Box>
  )
}

export default LineItems
