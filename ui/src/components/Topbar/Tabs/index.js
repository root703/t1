import React from 'react'
import MuiTabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { TABS, SUPER_ADMIN_TABS } from 'consts'
import Auth from 'utils/auth'
import { useHistory } from 'react-router'

const Tabs = ({ setActiveTab, activeTab = 0 }) => {
  const [user, setUser] = React.useState(null)
  const history = useHistory()

  const checkAuthState = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      setUser(user)
    } catch (err) {
      history.push('/login')
    }
  }

  React.useEffect(() => {
    checkAuthState()
  }, [])

  if (!user) return null

  const isSuperAdmin =
    user.signInUserSession.accessToken.payload?.['cognito:groups']?.includes(
      'super-admins'
    )

  const tabsToRender = isSuperAdmin ? SUPER_ADMIN_TABS : TABS

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <MuiTabs
      variant="scrollable"
      value={activeTab}
      onChange={handleChange}
      indicatorColor='primary'
      textColor='primary'
    // centered
    >
      {tabsToRender.map(tabName => (
        <Tab key={tabName} label={tabName} />
      ))}
    </MuiTabs>
  )
}
export default Tabs
