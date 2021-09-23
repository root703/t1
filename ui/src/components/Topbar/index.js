import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Tabs from './Tabs'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'
import Auth from 'utils/auth'

const useStyles = makeStyles({
  topbarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems : 'center',
    borderBottom: '1px solid black',
    paddingBottom: '1rem',
    // overflow:"scroll"
  },
  logoutContainer: {
    textAlign: 'right',
  },
  logoutText: {
    cursor: 'pointer',
  },
})

const Topbar = ({ activeTab, setActiveTab }) => {
  const classes = useStyles()
  const history = useHistory()

  const handleLogout = async () => {
    await Auth.signOut()
    history.push('/login')
  }

  return (
    <Box>
      <Box className={classes.logoutContainer}>
        <Typography className={classes.logoutText} onClick={handleLogout}>
          (Admin) Log out
        </Typography>
      </Box>
      <Box className={classes.topbarContainer}>
        <Box>
          <Typography variant='h4'>Flexor Quote App</Typography>
        </Box>
        <Box>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </Box>
      </Box>
    </Box>
  )
}

export default Topbar
