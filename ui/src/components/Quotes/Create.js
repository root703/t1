import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import {
  getYears,
  getMakes,
  getModels,
  getEngines,
  getBaseVehicle,
  getVehicleAttributes,
  getEstimatedWorkTimes,
  getFluid,
  getVehicleByVin,
} from 'utils/motorApi'
import { Box } from '@material-ui/core'
import {
  createQuote,
  createVehicle,
  createCustomer,
  getSpecificProducts,
  fetchAllLaborPricing,
} from 'queries'
import MaskedInput from 'react-text-mask'
import SnackBar from 'components/common/Snackbar'
import getStateFromZip from 'utils/getStateFromZip'
import SalesTax from 'sales-tax'
SalesTax.setTaxOriginCountry('US')

function PhoneNumberMask(props) {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  )
}

const useStyles = makeStyles(theme => ({
  root: {

  },
  formControl: {
    width: '100%',
    marginBottom: 8
  },
  disabledDropdown: {
    backgroundColor: "#F8F8F8"
  },
  tabs: {
    cursor: "pointer",
    padding: "12px 12px 12px 0px"
  },
  selectedTab: {
    textDecoration: "underline"
  }
}))

const QuoteForm = ({ viewQuote }) => {
  const classes = useStyles()

  const [customer, updateCustomer] = React.useState({})

  const handleCustomerChange = (field, value) => {
    const updatedCustomer = { ...customer }
    updatedCustomer[field] = value
    updateCustomer(updatedCustomer)
  }

  const [yearOptions, setYearOptions] = React.useState([])
  const [makeOptions, setMakeOptions] = React.useState([])
  const [modelOptions, setModelOptions] = React.useState([])
  const [subModelOptions, setSubModelOptions] = React.useState([])
  const [engineOptions, setEngineOptions] = React.useState([])

  const [year, setYear] = React.useState('')
  const [makeId, setMake] = React.useState('')
  const [modelId, setModel] = React.useState('')
  const [subModelId, setSubModel] = React.useState('')
  const [engine, setEngine] = React.useState('')
  const [zipCode, setZipCode] = React.useState('')

  const [engineDescription, setEngineDescription] = React.useState('')
  const [baseVehicle, setBaseVehicle] = React.useState('')
  const [vehicleAttributes, setVehicleAttributes] = React.useState(null)
  const [workTimes, setWorkTimes] = React.useState(null)
  const [manufacturerCode, setManufacturerCode] = React.useState(null)
  const [fluid, setFluid] = React.useState(null)

  const [vinZipCode, setVinZipCode] = React.useState('')
  const [vin, setVinNumber] = React.useState('')
  const [error, setError] = React.useState(false)

  const [hasCreatedQuote, setCreated] = React.useState(false)
  const [showVehicleModelState, setShowVehicleModelState] = React.useState(true)

  React.useEffect(() => {
    const getAndSetYears = async () => {
      const yearOptions = await getYears()
      setYearOptions(yearOptions)
    }
    getAndSetYears()
  }, [])

  const handleYearChange = async e => {
    const updatedYear = e.target.value
    setYear(updatedYear)
    const makes = await getMakes({ year: updatedYear })
    setMakeOptions(makes)
  }

  const handleMakeChange = async e => {
    const makeId = e.target.value
    setMake(makeId)
    const models = await getModels({ year, makeId })
    setModelOptions(models)
  }

  const handleModelChange = async e => {
    const modelId = e.target.value
    const subModelOptions = modelOptions.find(
      model => model.modelId === modelId
    )?.subModels
    setModel(modelId)
    setSubModelOptions(subModelOptions)
    const baseVehicle = await getBaseVehicle({ year, makeId, modelId })

    setBaseVehicle(baseVehicle)
  }

  const handleSubModelChange = async e => {
    const subModelId = e.target.value
    setSubModel(subModelId)
    const engines = await getEngines({ year, makeId, modelId, subModelId })
    setEngineOptions(engines)
  }

  const handleEngineChange = async e => {
    const selectedEngine = e.target.value
    const [engineId, engineDescription] = selectedEngine.split(',')

    setEngine(selectedEngine)
    setEngineDescription(engineDescription)

    const vehicleAttributes = await getVehicleAttributes({
      baseVehicleId: baseVehicle.BaseVehicleID,
      engineId,
    })
    setVehicleAttributes(vehicleAttributes)
    const automaticTransmission = vehicleAttributes?.Transmissions.find(
      transmission =>
        transmission.ControlType.toLowerCase().includes('automatic')
    )

    const transmissionId = automaticTransmission?.TransmissionID
    const manufacturerCode = automaticTransmission?.ManufacturerCode
    setManufacturerCode(manufacturerCode)

    const workTimes = await getEstimatedWorkTimes({
      engineId: Number(engineId),
      transmissionId,
      baseVehicleId: baseVehicle.BaseVehicleID,
      subModelId,
    })
    setWorkTimes(workTimes)

    const selectedWorkTimeId = workTimes[0]?.ApplicationID
    const fluid = await getFluid({
      baseVehicleId: baseVehicle.BaseVehicleID,
      engineId: Number(engineId),
      transmissionId,
      workTimeId: selectedWorkTimeId,
      subModelId,
    })
    setFluid(fluid)
  }

  const handleZipChange = e => setZipCode(e.target.value)
  const handleVinZipChange = e => setVinZipCode(e.target.value)
  const handleVinChange = e => setVinNumber(e.target.value)

  const handleSubmit = async () => {
    const state = getStateFromZip(zipCode || vinZipCode)
    const { rate: taxRate } = await SalesTax.getSalesTax('US', state)
    const laborPricings = await fetchAllLaborPricing()
    const defaultLaborPricing = laborPricings[0]
    const LINES_FLUSHED_LABOR_TIME = 0.6
    if (vin) {
      if (!vinZipCode) return
      const vehicleFromVin = await getVehicleByVin({ vin })
      const {
        MakeName: make,
        ModelName: model,
        EngineID: engineId,
        SubModelID: subModelId,
        BaseVehicleID: baseVehicleId,
        SubModelName: subModelName,
        Year: year,
        EngineDescription: engineDescription,
      } = vehicleFromVin
      const vehicleAttributes = await getVehicleAttributes({
        baseVehicleId,
        engineId,
      })
      const transmissionModel =
        vehicleAttributes?.Transmissions[0].ManufacturerCode
      const automaticTransmission = vehicleAttributes?.Transmissions.find(
        transmission =>
          transmission.ControlType.toLowerCase().includes('automatic')
      )
      const transmissionId = automaticTransmission?.TransmissionID
      const manufacturerCode = automaticTransmission?.ManufacturerCode
      const workTimes = await getEstimatedWorkTimes({
        engineId: Number(engineId),
        transmissionId,
        baseVehicleId,
        subModelId,
      })
      const selectedWorkTimeId = workTimes[0]?.ApplicationID
      const fluid = await getFluid({
        baseVehicleId,
        engineId: Number(engineId),
        transmissionId,
        workTimeId: selectedWorkTimeId,
        subModelId,
      })
      if (!fluid || !fluid?.grade) {
        setError(true)
        return
      }
      const {
        Value: fluidAmount,
        UnitOfMeasure: fluidMeasurement,
        grade: { Description: fluidTitle },
      } = fluid
      if (!fluidAmount) {
        setError(true)
        return
      }
      const getFluidAmount = () => {
        const isNSfluidAmount = fluidAmount === 'NS'
        if (isNSfluidAmount) return 7
        return fluidAmount
      }

      const vehicleForDb = {
        year,
        make,
        model,
        sub_model: subModelName,
        fluid_amount: Number(getFluidAmount()),
        fluid_measurement: 'QUART',
        fluid_title: fluidTitle,
        engine_description: engineDescription,
        transmission_model: transmissionModel,
      }

      let foundProducts = []
      if (transmissionModel || fluidTitle) {
        const productsFromDb = await getSpecificProducts({
          transmissionModel,
          fluidTitle,
        })
        if (productsFromDb && productsFromDb.length > 0)
          foundProducts = productsFromDb
      }

      const customerFromDb = await createCustomer({
        customer: {
          ...customer,
          zip: Number(customer.zip),
          phone: Number(customer.phone.replace(/[^0-9.]/g, '')),
        },
      })

      const vehicleFromDb = await createVehicle({
        vehicle: vehicleForDb,
      })

      const defaultWorkTime = workTimes[0]
      const laborTime = defaultWorkTime?.Items[0]?.BaseLaborTime

      const quoteForDb = {
        status: 'QUOTE_REQUESTED',
        tax: taxRate,
        vehicle_id: vehicleFromDb.id,
        customer_id: customerFromDb.id,
        repair_shop_id: 1,
        labor_time: laborTime + LINES_FLUSHED_LABOR_TIME,
        labor_price: defaultLaborPricing.rate,
        vin,
      }

      if (foundProducts.length > 0) {
        const transmissionProduct = foundProducts.find(
          product => product?.category === 'TRANSMISSION'
        )
        if (transmissionProduct)
          quoteForDb.transmission_price = transmissionProduct.unit_sale_price
        const fluidProduct = foundProducts.find(
          product => product?.category === 'TRANSMISSION_FLUID'
        )
        if (fluidProduct) quoteForDb.fluid_price = fluidProduct.unit_sale_price
      }

      const quoteFromDb = await createQuote({ quote: quoteForDb })
      setCreated(true)
      setTimeout(() => {
        setCreated(false)
      }, 1000)

      viewQuote({
        ...quoteForDb,
        vehicle: vehicleFromDb,
        id: quoteFromDb.id,
        customer: customerFromDb,
      })

      return
    }
    if (!fluid || !fluid?.grade) {
      setError(true)
      return
    }
    const {
      Make: { MakeName: make },
      Model: { ModelName: model },
    } = baseVehicle
    const {
      Value: fluidAmount,
      UnitOfMeasure: fluidMeasurement,
      grade: { Description: fluidTitle },
    } = fluid

    if (!fluidAmount) {
      setError(true)
      return
    }

    const getFluidAmount = () => {
      const isNSfluidAmount = fluidAmount === 'NS'
      if (isNSfluidAmount) return 7
      return fluidAmount
    }

    const defaultWorkTime = workTimes[0]
    const laborTime = defaultWorkTime?.Items[0]?.BaseLaborTime
    const transmissionModel =
      vehicleAttributes?.Transmissions[0].ManufacturerCode

    const subModelName =
      subModelOptions.length > 0
        ? subModelOptions.find(subModel => subModel.SubModelID === subModelId)
          ?.SubModelName
        : null

    const vehicleForDb = {
      year,
      make,
      model,
      sub_model: subModelName,
      fluid_amount: Number(getFluidAmount()),
      fluid_measurement: 'QUART',
      fluid_title: fluidTitle,
      engine_description: engineDescription,
      transmission_model: transmissionModel,
    }

    let foundProducts = []
    if (transmissionModel || fluidTitle) {
      const productsFromDb = await getSpecificProducts({
        transmissionModel,
        fluidTitle,
      })
      if (productsFromDb && productsFromDb.length > 0)
        foundProducts = productsFromDb
    }

    const customerFromDb = await createCustomer({
      customer: {
        ...customer,
        zip: Number(customer.zip),
        phone: Number(customer.phone.replace(/[^0-9.]/g, '')),
      },
    })
    const vehicleFromDb = await createVehicle({
      vehicle: vehicleForDb,
    })

    const quoteForDb = {
      status: 'QUOTE_REQUESTED',
      tax: taxRate,
      vehicle_id: vehicleFromDb.id,
      customer_id: customerFromDb.id,
      repair_shop_id: 1,
      labor_time: laborTime + LINES_FLUSHED_LABOR_TIME,
      labor_price: defaultLaborPricing.rate,
    }

    if (foundProducts.length > 0) {
      const transmissionProduct = foundProducts.find(
        product => product?.category === 'TRANSMISSION'
      )
      if (transmissionProduct)
        quoteForDb.transmission_price = transmissionProduct.unit_sale_price
      const fluidProduct = foundProducts.find(
        product => product?.category === 'TRANSMISSION_FLUID'
      )
      if (fluidProduct) quoteForDb.fluid_price = fluidProduct.unit_sale_price
    }

    // get related Products

    const quoteFromDb = await createQuote({ quote: quoteForDb })
    setCreated(true)
    setTimeout(() => {
      setCreated(false)
    }, 1000)

    viewQuote({
      ...quoteForDb,
      vehicle: vehicleFromDb,
      id: quoteFromDb.id,
      customer: customerFromDb,
    })
  }

  const closeNoty = () => {
    setCreated(false)
  }

  if (error)
    return (
      <Box textAlign='center'>
        <Typography>Please call support</Typography>
        <Button
          onClick={() => setError(false)}
          variant='contained'
          color='primary'
        >
          Back To Quote Form
        </Button>
      </Box>
    )

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      style={{ marginTop: 32 }}
    >
      <Grid item>
        <Box textAlign='center'>
          <form className={classes.root} noValidate autoComplete='off'>
            <Grid container spacing={2}>
              <Grid item xs={6} >
                <FormControl className={classes.formControl}>
                  <TextField
                    variant="outlined"
                    value={customer.first_name}
                    label='First Name'
                    onChange={e => handleCustomerChange('first_name', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    placeholder="Enter First Name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} >
                <FormControl className={classes.formControl}>
                  <TextField
                    variant="outlined"
                    value={customer.last_name}
                    label='Last Name'
                    onChange={e => handleCustomerChange('last_name', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    placeholder="Enter Last Name"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} >
                <FormControl className={classes.formControl}>
                  {/* <InputLabel htmlFor='phone-number'>Phone</InputLabel> */}
                  <TextField
                    label="phone"
                    variant="outlined"
                    value={customer.phone}
                    onChange={e => handleCustomerChange('phone', e.target.value)}
                    id='phone-number'
                    // InputProps={{
                    //   inputComponent: PhoneNumberMask,
                    // }}
                    InputLabelProps={{ shrink: true }}
                    placeholder="Enter Phone #"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} >
                <FormControl className={classes.formControl}>
                  <TextField
                    variant="outlined"
                    value={customer.zip}
                    label='Zip Code'
                    onChange={e => handleCustomerChange('zip', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    placeholder="Enter Zip Code"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <FormControl className={classes.formControl}>
                  <TextField
                    variant="outlined"
                    value={customer.email}
                    label='Email'
                    onChange={e => handleCustomerChange('email', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    placeholder="Enter Email"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </form>
          <div style={{ display: "flex" }}>
            <Typography
              style={{ marginRight: 8 }}
              className={`${classes.tabs} ${showVehicleModelState ? classes.selectedTab : ""}`}
              onClick={() => setShowVehicleModelState(true)}>VEHICLE MODEL</Typography>
            <Typography
              className={`${classes.tabs} ${!showVehicleModelState ? classes.selectedTab : ""}`}
              onClick={() => setShowVehicleModelState(false)}>VIN NUMBER</Typography>
          </div>
          {
            showVehicleModelState
              ? <form className={classes.root} noValidate autoComplete='off'>
                <Grid container spacing={2}>
                  <Grid item xs={6} >
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel shrink={true} id="year-label">{!year ? "" : "Year"}</InputLabel>
                      <Select
                        labelId="year-label"
                        label="Year"
                        displayEmpty
                        className={classes.selectEmpty}
                        value={year}
                        onChange={handleYearChange}>
                        <MenuItem value=''>
                          Select Year
                        </MenuItem>
                        {yearOptions.map(year => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* <FormHelperText>Please select a year</FormHelperText> */}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} >
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel shrink={true} id="make-label">{!makeId ? "" : "Make"}</InputLabel>
                      <Select
                        labelId="make-label"
                        label="Make"
                        classes={{ disabled: classes.disabledDropdown }}
                        disabled={!year}
                        displayEmpty
                        className={classes.selectEmpty}
                        value={makeId}
                        onChange={handleMakeChange}>
                        <MenuItem value=''>
                          Select Make
                        </MenuItem>
                        {makeOptions.map(make => (
                          <MenuItem key={make.name} value={make.makeId}>
                            {make.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* <FormHelperText>Please select a make</FormHelperText> */}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="model-label" >{!modelId ? "" : "Model"}</InputLabel>
                      <Select
                        labelId="model-label"
                        label="Model"
                        variant="outlined"
                        displayEmpty
                        disabled={!makeId}
                        classes={{ disabled: classes.disabledDropdown }}
                        value={modelId}
                        onChange={handleModelChange}>
                        <MenuItem value=''>
                          Select Model
                        </MenuItem>
                        {modelOptions.map(model => (
                          <MenuItem key={model.name} value={model.modelId}>
                            {model.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* <FormHelperText>Please select a model</FormHelperText> */}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6} >
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="sub-model-label">{!subModelId ? "" : "Sub Model"}</InputLabel>
                      <Select
                        labelId="sub-model-label"
                        label="Sub Model"
                        disabled={!modelId}
                        displayEmpty
                        classes={{ disabled: classes.disabledDropdown }}
                        value={subModelId}
                        onChange={handleSubModelChange}>
                        <MenuItem value=''>
                          Select Sub Model
                        </MenuItem>
                        {subModelOptions.map(subModel => (
                          <MenuItem key={subModel.SubModelName} value={subModel.SubModelID}>
                            {subModel.SubModelName}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* <FormHelperText>Please select a model</FormHelperText> */}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} >
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="engine-model">{!engine ? "" : "Engine"}</InputLabel>
                      <Select

                        labelId="engine-model"
                        label="Engine"
                        displayEmpty
                        disabled={!subModelId}
                        classes={{ disabled: classes.disabledDropdown }}
                        value={engine}
                        onChange={handleEngineChange}>
                        <MenuItem value=''>
                          Select Engine
                        </MenuItem>
                        {engineOptions.map(engine => (
                          <MenuItem
                            key={engine.engineId}
                            value={`${engine.engineId},${engine.description}`}
                          >
                            {engine.description}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* <FormHelperText>Please select an engine</FormHelperText> */}
                    </FormControl>
                  </Grid>
                </Grid>
                {/* <FormControl>
              <InputLabel htmlFor='zip-code-1'>Zip Code</InputLabel>
              <Input id='zip-code-1' value={zipCode} onChange={handleZipChange} />
            </FormControl> */}
              </form>
              // <Typography>OR</Typography>
              : <form className={classes.root} noValidate autoComplete='off'>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                    <FormControl className={classes.formControl}>
                      {/* <InputLabel htmlFor='vin-number'>VIN</InputLabel> */}
                      <TextField
                        variant="outlined"
                        label="VIN"
                        placeholder="Enter VIN"
                        id='vin-number'
                        value={vin}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleVinChange} />
                    </FormControl>
                    {/* <FormControl>
                      <InputLabel htmlFor='zip-code-2'>Zip Code</InputLabel>
                      <Input
                        id='zip-code-2'
                        value={vinZipCode}
                        onChange={handleVinZipChange}
                      />
                    </FormControl> */}
                  </Grid>
                </Grid>

              </form>
          }
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Create Quote
      </Button>
          <SnackBar
            open={hasCreatedQuote}
            message='Quote Created!'
            close={closeNoty}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default QuoteForm
