import Box from '@material-ui/core/Box'
import QuoteTable from './Table'
import Typography from '@material-ui/core/Typography'
import { useQuery } from 'react-query'
import { fetchAllQuotes } from 'queries'
import Button from '@material-ui/core/Button'
import React from 'react'

import CreateQuote from './Create'
import QuoteDetail from './Detail'
import Export from './Export'

const Quotes = ({
  selectedQuote,
  setSelectedQuote,
  isCreatingQuote,
  setCreatingQuote,
}) => {
  const {
    isLoading,
    error,
    data: quotes,
    isFetching,
  } = useQuery('/quotes', fetchAllQuotes)

  const createQuote = () => {
    setCreatingQuote(true)
  }

  const selectQuote = quote => {
    setSelectedQuote(quote)
  }

  if (selectedQuote) {
    if (!selectedQuote.transmission_price)
      return (
        <Box style={{ textAlign: 'center' }}>
          <Typography variant='h5'>
            No products were found for the following vehicle:
          </Typography>
          <Typography variant='body2'>
            Year: {selectedQuote.vehicle.year}
          </Typography>
          <Typography variant='body2'>
            Make: {selectedQuote.vehicle.make}
          </Typography>
          <Typography variant='body2'>
            Model: {selectedQuote.vehicle.model}
          </Typography>
          <Typography variant='body2'>
            Sub Model: {selectedQuote.vehicle.sub_model}
          </Typography>
          <Typography variant='body2'>
            Fluid: {selectedQuote.vehicle.fluid_title}
          </Typography>
          <Typography variant='body2'>
            Transmission: {selectedQuote.vehicle.transmission_model}
          </Typography>
          <Box style={{ margin: '3rem 0' }}>
            <Typography variant='h4'>Please Contact Customer</Typography>
          </Box>
        </Box>
      )
    return (
      <Box>
        <QuoteDetail quote={selectedQuote} />
      </Box>
    )
  }

  if (isCreatingQuote) {
    return (
      <Box>
        <CreateQuote viewQuote={selectQuote} />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant='h4'>Quotes</Typography>
      <Button onClick={createQuote}>Create Quote</Button>
      <Export quotes={quotes} />
      <QuoteTable quotes={quotes} selectQuote={selectQuote} />
    </Box>
  )
}

export default Quotes
