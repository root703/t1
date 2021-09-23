import React from 'react'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider';

import Summary from './Summary'
import Installer from './Installer'
import Warranty from './Warranty'
import LineItems from './LineItems'
import Countdown from './CountDown'
import ActionItems from './ActionItems'

import dayjs from 'dayjs'
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const Quote = ({ quote }) => {

  const [warrantyPrice, setWarrantyPrice] = React.useState(0)
  const [warrantyType, setWarrantyType] = React.useState('standard')

  const [installerType, setInstallerType] = React.useState('transmission_package')

  const [company, setCompany] = React.useState('')
  const [street, setStreet] = React.useState('')
  const [unit, setUnit] = React.useState('')
  const [city, setCity] = React.useState('')
  const [zip, setZip] = React.useState('')

  if (!quote) return null

  const {
    transmission_price: transmissionPrice,
    fluid_price: fluidPrice,
    labor_price: laborPrice,
    shipping_rate: shippingCost,
  } = quote

  const transmissionAmount = 1
  const fluidAmount = quote?.vehicle?.fluid_amount
  const workTime = quote?.labor_time

  const totalCostPreTax =
    transmissionAmount * transmissionPrice +
    fluidAmount * fluidPrice +
    workTime * laborPrice +
    shippingCost +
    warrantyPrice
  const taxesOwed = totalCostPreTax * quote?.tax
  const totalCostAfterTax = totalCostPreTax + taxesOwed

  const handleWarrantyChange = e => {
    const warrantyType = e.target.value
    if (warrantyType !== 'standard') {
      setWarrantyPrice(150)
    } else {
      setWarrantyPrice(0)
    }
    setWarrantyType(warrantyType)
  }

  const handleInstallerChange = e => {
    setInstallerType(e.target.value)
  }

  return (
    <Container maxWidth='sm'>
      <Summary quote={quote} totalCostAfterTax={totalCostAfterTax} />
      <LineItems
        quote={quote}
        transmissionPrice={transmissionPrice}
        fluidPrice={fluidPrice}
        laborCost={laborPrice}
        shippingCost={shippingCost}
        taxRate={quote?.tax}
        warrantyPrice={warrantyPrice}
        warrantyType={warrantyType}
        fluidAmount={fluidAmount}
        transmissionAmount={transmissionAmount}
        workTime={workTime}
        taxesOwed={taxesOwed}
      />
      <Divider style={{ backgroundColor: "darkgray" }} />
      <Warranty
        quote={quote}
        warrantyType={warrantyType}
        handleWarrantyChange={handleWarrantyChange}
      />
      <Divider style={{ backgroundColor: "darkgray" }} />
      <Installer
        setCompany={setCompany}
        setStreet={setStreet}
        setUnit={setUnit}
        setCity={setCity}
        setZip={setZip}
        quote={quote}
        installerType={installerType}
        handleInstallerChange={handleInstallerChange} />
      <Divider style={{ backgroundColor: "darkgray" }} />
      <br />
      <Countdown
        totalCostPreTax={totalCostPreTax}
        taxesOwed={taxesOwed}
        shippingCost={shippingCost}
        quote={quote}
      />
      <ActionItems />
    </Container>
  )
}

export default Quote
