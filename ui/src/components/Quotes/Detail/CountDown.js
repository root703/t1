import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Countdown from 'react-countdown'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  priceContainer: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  },
  normalPrice: {
    textDecoration: 'line-through',
    color: 'gray',
  },
  discountedPrice: {
    fontWeight: 'bold',
    marginLeft: '.5rem',
  },
})

const CountDownToBuy = ({
  totalCostPreTax,
  taxesOwed,
  shippingCost,
  quote,
}) => {
  const classes = useStyles()
  const getMinutes = desiredMinutes =>
    new Date(quote.created_at) + desiredMinutes * 60 * 1000
  const thirtyMinutes = getMinutes(30)

  const totalOwedWithShipping = totalCostPreTax + taxesOwed
  const totalOwedWithoutShipping = totalOwedWithShipping - shippingCost

  return (
    <Box style={{ textAlign: 'center' }}>
      <Typography style={{ fontWeight: 'bold' }}>
        Time left to Save{' '}
        <Countdown date={thirtyMinutes} precision={3} intervalDelay={0} />
      </Typography>
      <Typography style={{ textTransform: 'uppercase' }}>
        Call now or pay within 30 minutes to get free shipping!
      </Typography>
      <Box className={classes.priceContainer}>
        <Typography className={classes.normalPrice}>
          $
          {totalOwedWithShipping.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </Typography>
        <Typography className={classes.discountedPrice}>
          $
          {totalOwedWithoutShipping
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </Typography>
      </Box>
    </Box>
  )
}

export default CountDownToBuy
