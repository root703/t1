import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  input: {
    width: '100%',
  },
})

const Billing = ({ customer, vehicle, handleBillingUpdate }) => {
  const classes = useStyles()

  const { vin } = vehicle

  const vehicleDescription = `${vehicle.year} ${vehicle.make} ${vehicle.model}`

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
  const addressLineOne = street

  return (
    <Box>
      <Typography variant='body2'>Billing:</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={firstName}
            label='First Name'
            name='first_name'
            onChange={handleBillingUpdate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={lastName}
            label='Last Name'
            name='last_name'
            onChange={handleBillingUpdate}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            value=''
            label='Company'
            name='company'
            onChange={handleBillingUpdate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={addressLineOne}
            label='Address Line 1'
            name='street'
            onChange={handleBillingUpdate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={unit || ''}
            label='Address Line 2'
            onChange={handleBillingUpdate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={city}
            label='City'
            name='city'
            onChange={handleBillingUpdate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={zip}
            label='Postcode / ZIP'
            name='zip'
            onChange={handleBillingUpdate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value='US'
            label='Country / Region'
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={state}
            label='State / Country'
            name='state'
            onChange={handleBillingUpdate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={email}
            label='Email Address'
            name='email'
            onChange={handleBillingUpdate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={phone}
            label='Phone'
            name='phone'
            onChange={handleBillingUpdate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value=''
            label='Payment Method'
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value=''
            label='Transaction ID'
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={vin}
            label='VIN'
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={vehicleDescription}
            label='Vehicle'
            disabled
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Billing
