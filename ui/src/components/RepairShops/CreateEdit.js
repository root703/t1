import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { createRepairShop, updateRepairShop, deleteRepairShop } from 'queries'
import React from 'react'
import SnackBar from 'components/common/Snackbar'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles({
  input: {
    width: '100%',
  },
  actionContainer: {
    display: 'flex',
    margin: '1rem 0',
    alignItems: 'center',
  },
  button: {
    margin: '0 1rem',
  },
  zipContainer: {
    display: 'flex',
  },
})

const Shipping = ({ repairShop = {}, clearState }) => {
  const classes = useStyles()
  const [name, setName] = React.useState(repairShop?.name || '')
  const [city, setCity] = React.useState(repairShop?.city || '')
  const [state, setState] = React.useState(repairShop?.state || '')
  const [zip, setZip] = React.useState(repairShop?.zip || '')
  const [street, setStreet] = React.useState(repairShop?.street || '')
  const [serviceZips, setServiceZips] = React.useState(
    repairShop?.service_zips || []
  )
  const [newServiceZip, setNewServiceZip] = React.useState('')

  const [hasUpdated, setUpdated] = React.useState(false)

  const closeNoty = () => setUpdated(false)

  const addressLineOne = street

  const handleCreateUpdate = async () => {
    const payload = {
      name,
      city,
      state,
      zip: Number(zip),
      street,
      service_zips: {
        set: serviceZips.map(zip => Number(zip)),
      },
    }
    if (repairShop?.id) {
      await updateRepairShop({ shop: { ...repairShop, ...payload } })
    } else {
      await createRepairShop({ shop: payload })
    }
    setUpdated(true)
  }

  const handleDelete = async () => {
    await deleteRepairShop({ shop: repairShop })
    clearState()
  }

  const handleAddZip = () => {
    setServiceZips([...serviceZips, newServiceZip])
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            value={name}
            label='Company'
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={addressLineOne}
            label='Address Line 1'
            onChange={e => setStreet(e.target.value)}
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
          <TextField
            className={classes.input}
            value={city}
            label='City'
            onChange={e => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            value={zip}
            label='Postcode / ZIP'
            onChange={e => setZip(e.target.value)}
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
            onChange={e => setState(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          {serviceZips.map(zip => {
            const removeZip = () => {
              const newServiceZips = serviceZips.filter(
                existingZip => existingZip !== zip
              )
              setServiceZips(newServiceZips)
            }
            return <Chip key={zip} label={zip} onDelete={removeZip} />
          })}
          <Box className={classes.zipContainer}>
            <TextField
              className={classes.input}
              value={newServiceZip}
              label='Add Service Zip'
              onChange={e => setNewServiceZip(e.target.value)}
            />
            <Button
              className={classes.button}
              variant='contained'
              onClick={handleAddZip}
            >
              Add
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box className={classes.actionContainer}>
        <Button
          className={classes.button}
          variant='contained'
          onClick={handleCreateUpdate}
        >
          Save
        </Button>
        <Button
          className={classes.button}
          variant='contained'
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
      <SnackBar open={hasUpdated} message='Shop Updated!' close={closeNoty} />
    </Box>
  )
}

export default Shipping
