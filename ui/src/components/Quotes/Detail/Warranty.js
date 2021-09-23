import React from 'react'
import Box from '@material-ui/core/Box'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  warrantySelection: {
    margin: '1rem 0',
  },
})

const Warranty = ({ quote, warrantyType, handleWarrantyChange }) => {
  const classes = useStyles()
  const { standard_warranty: standardWarranty,
    extended_warranty: extendedWarranty } = quote
  return (
    <Box className={classes.warrantySelection}>
      <RadioGroup value={warrantyType} onChange={handleWarrantyChange}>
        <FormControlLabel
          value='standard'
          control={<Radio />}
          label={`Standard Warranty – ${standardWarranty ? standardWarranty : "18 Months, 24,000 mile"} warranty`}
        />

        {extendedWarranty && <FormControlLabel
          value='upgrade'
          control={<Radio />}
          label={`Upgraded to  ${extendedWarranty} warranty for $150.00`}
        />}
      </RadioGroup>
    </Box>
  )
}

export default Warranty
