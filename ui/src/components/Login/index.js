import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import React from 'react'
import Auth from 'utils/auth'
import { useHistory } from 'react-router'

const useStyles = makeStyles({
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  contentContainer: {
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
  },
})

const Login = ({ handleLogin }) => {
  const classes = useStyles()
  const history = useHistory()

  const [username, setUserName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [needsNewPassword, setNeedsNewPass] = React.useState(false)
  const [newPassword, setNewPass] = React.useState('')

  const handleNewPasswordForUser = async () => {
    try {
      const user = await Auth.signIn(username, password)
      await Auth.completeNewPassword(
        user, // the Cognito User Object
        newPassword
      )
      history.push('/')
    } catch (err) {
      console.log('Error changing pass: ', err)
    }
  }

  const loginUser = async () => {
    if (needsNewPassword) {
      handleNewPasswordForUser()
      return
    }
    // handleLogin({ username, password })
    try {
      const user = await Auth.signIn(username, password)
      const challengeType = user?.challengeName
      const needsNewPassword = challengeType === 'NEW_PASSWORD_REQUIRED'
      if (needsNewPassword) {
        setNeedsNewPass(true)
        return
      }
      await Auth.signIn(username, password)
      history.push('/')
    } catch (error) {
      console.log('error signing in', error)
    }
  }

  const handleUserNameChange = e => setUserName(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)
  const handleNewPassChange = e => setNewPass(e.target.value)

  return (
    <Container maxWidth='sm'>
      <Typography variant='h3' align='center'>
        Flexor Quote App
      </Typography>
      <Box className={classes.contentContainer}>
        <Typography variant='h4' align='center'>
          Log in
        </Typography>
        <Box className={classes.inputContainer}>
          {needsNewPassword && (
            <TextField
              onChange={handleNewPassChange}
              value={newPassword}
              type='password'
              label='New Password'
            />
          )}
          {!needsNewPassword && (
            <>
              <TextField
                onChange={handleUserNameChange}
                value={username}
                label='Username'
              />
              <TextField
                onChange={handlePasswordChange}
                value={password}
                type='password'
                label='Password'
              />
            </>
          )}
        </Box>
        <Box className={classes.buttonContainer}>
          <Button onClick={loginUser} variant='contained' color='primary'>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
