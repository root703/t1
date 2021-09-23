import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import React from 'react'

import dayjs from 'dayjs'
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const useStyles = makeStyles({
  summaryContainer: {
    margin: '1rem 0',
  },
  packageDetail: {
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '.5rem 0',
  },
})

const Summary = ({ quote, totalCostAfterTax }) => {
  const classes = useStyles()

  const {
    vehicle,
    customer,
    id: quoteId,
    created_at: createdAt,
  } = quote

  const quoteDate = new Date(createdAt)

  const formattedQuoteDate = dayjs(quoteDate).format('l')
  const formattedQuoteTime = dayjs(quoteDate).format('LTS')

  const { year, make, model, sub_model, engine_description } = vehicle

  return (
    <Box className={classes.summaryContainer}>
      <Typography style={{ fontWeight: 'bold' }}>Quote # {quoteId}</Typography>
      <Typography>
        Date: {formattedQuoteDate} @ {formattedQuoteTime}
      </Typography>
      <Typography>
        Vehicle: {year} {make} {model} {sub_model} {engine_description}
      </Typography>
      <Typography>VIN: {quote.vin || 'N/A'}</Typography>
      <Typography>Zip Code: {customer.zip}</Typography>
      <Typography className={classes.packageDetail}>
        Re-Manufactured Transmission Assembly Package ${totalCostAfterTax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
      </Typography>
    </Box>
  )
}

export default Summary
