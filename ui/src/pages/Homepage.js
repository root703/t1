import React from 'react'
import Container from '@material-ui/core/Container'
import Topbar from 'components/Topbar'
import { TABS } from 'consts'

import Orders from 'components/Orders'
import Quotes from 'components/Quotes'
import Products from 'components/Products'
import LaborPricing from 'components/LaborPricing'
import RepairShops from 'components/RepairShops'
import Auth from 'utils/auth'
import { useHistory } from 'react-router'

const Homepage = () => {
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

  const [activeTab, setActiveTab] = React.useState(0)

  const [selectedOrder, setSelectedOrder] = React.useState(null)
  const [selectedQuote, setSelectedQuote] = React.useState(null)
  const [isCreatingQuote, setCreatingQuote] = React.useState(false)
  const [isCreatingProduct, setCreatingStatus] = React.useState(false)
  const [selectedProduct, setProduct] = React.useState(null)
  const [isImportingProduct, setImportingProduct] = React.useState(false)
  const [isCreatingShop, setCreatingShop] = React.useState(false)
  const [selectedRepairShop, setRepairShop] = React.useState(null)

  const clearTabState = () => {
    setSelectedOrder(null)
    setSelectedQuote(null)
    setCreatingQuote(false)
    setCreatingStatus(false)
    setCreatingShop(false)
    setProduct(null)
    setRepairShop(null)
    setImportingProduct(false)
  }

  const currentTab = TABS[activeTab]

  const handleTabClick = selectedTab => {
    clearTabState()
    setActiveTab(selectedTab)
  }

  if (!user) return null

  const Content = () => {
    switch (currentTab) {
      case 'Orders':
        return (
          <Orders
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
          />
        )
      case 'Quotes':
        return (
          <Quotes
            selectedQuote={selectedQuote}
            setSelectedQuote={setSelectedQuote}
            isCreatingQuote={isCreatingQuote}
            setCreatingQuote={setCreatingQuote}
          />
        )
      case 'Products':
        return (
          <Products
            isCreatingProduct={isCreatingProduct}
            setCreatingStatus={setCreatingStatus}
            selectedProduct={selectedProduct}
            setProduct={setProduct}
            setImportingProduct={setImportingProduct}
            isImportingProduct={isImportingProduct}
          />
        )
      case 'Labor Pricing':
        return <LaborPricing />
      case 'Repair Shops':
        return (
          <RepairShops
            isCreatingShop={isCreatingShop}
            setCreatingShop={setCreatingShop}
            selectedRepairShop={selectedRepairShop}
            setRepairShop={setRepairShop}
          />
        )
      default:
        return null
    }
  }

  return (
    <Container maxWidth={false}>
      <Topbar activeTab={activeTab} setActiveTab={handleTabClick} />
      <Content tab={currentTab} />
    </Container>
  )
}

export default Homepage
