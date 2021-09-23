import LoginForm from 'components/Login' 
import { useHistory } from 'react-router'

const Login = () => {
  const history = useHistory()
  const handleLogin = ({ username, password }) => {
    console.log('username', username)
    console.log('password', password)
    history.push('/')
  }

  return <LoginForm handleLogin={handleLogin} />
}

export default Login
