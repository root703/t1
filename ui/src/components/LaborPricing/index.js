import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useQuery } from 'react-query'
import { fetchAllLaborPricings } from 'queries'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import React from 'react'
import Button from '@material-ui/core/Button'
import { updateLaborPrice } from 'queries'
import SnackBar from 'components/common/Snackbar'

const LaborPricing = () => {
  const {
    isLoading,
    error,
    data: laborPricings,
    isFetching,
  } = useQuery('/labor', fetchAllLaborPricings)

  const defaultLaborPricing = laborPricings && laborPricings[0]
  const [pricing, setPricing] = React.useState(0)
  const [didUpdate, setUpdated] = React.useState(false)

  const handleChange = e => {
    setPricing(e.target.value)
  }

  React.useEffect(() => {
    if (!error && !isLoading) {
      setPricing(defaultLaborPricing?.rate)
    }
  }, [laborPricings, error, isLoading])

  const handleLaborUpdate = async () => {
    await updateLaborPrice({
      labor: { ...defaultLaborPricing, rate: Number(pricing) },
    })
    setUpdated(true)
  }

  const closeNoty = () => setUpdated(false)

  if (isLoading || isFetching) return null

  return (
    <Box>
      <Typography variant='h4'>Labor Pricing</Typography>
      <FormControl>
        <InputLabel htmlFor='standard-adornment-amount'>
          Amount Per Hour
        </InputLabel>
        <Input
          id='standard-adornment-amount'
          value={pricing}
          onChange={handleChange}
          type='number'
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
        />
      </FormControl>
      <Button variant='contained' color='primary' onClick={handleLaborUpdate}>
        Update
      </Button>
      <SnackBar
        open={didUpdate}
        message='Labor Price Updated!'
        close={closeNoty}
      />
    </Box>
  )
}

export default LaborPricing
