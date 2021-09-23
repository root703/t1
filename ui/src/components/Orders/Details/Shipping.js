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

const Shipping = ({ repairShop }) => {
  const classes = useStyles()
  const { name, city, state, zip, street } = repairShop
  const addressLineOne = street
  const addressLineTwo = `${city}, ${state}, ${zip}`
  return (
    <Box>
      <Typography variant='body2'>Shipping:</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField className={classes.input} value={name} label='Company' />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={addressLineOne}
            label='Address Line 1'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value=''
            label='Address Line 2'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField className={classes.input} value={city} label='City' />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={zip}
            label='Postcode / ZIP'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value='US'
            label='Country / Region'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={state}
            label='State / Country'
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Shipping
