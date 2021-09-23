import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  actionContainer: {
    textAlign: 'center',
  },
  buttonSubtitle: {
    fontSize: '10px',
    color: 'gray',
    textAlign: 'center'
  },
})

const ActionItems = () => {
  const classes = useStyles()
  return (
    <Box className={classes.actionContainer}>
        <Typography className={classes.buttonSubtitle}>
          Proceed to Checkout
        </Typography>
        <Button variant='contained'>Purchase Online</Button>

    </Box>
  )
}

export default ActionItems
