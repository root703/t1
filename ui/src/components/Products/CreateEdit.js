import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { upsertProduct, deleteProduct } from 'queries'
import NumberFormat from 'react-number-format'

const useStyles = makeStyles({
  input: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '1rem 0',
  },
  formControl: {
    minWidth: 120,
    margin: '.5rem 0',
  },
  button: {
    marginRight: '1rem',
  },
})

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      isNumericString
      prefix='$'
    />
  )
}

const CreateProduct = ({ product, setProduct, hasUpdated, setUpdated }) => {
  const classes = useStyles()

  const [category, setCategory] = React.useState(
    product?.category || 'TRANSMISSION'
  )
  const [fluidMeasurement, setFluidMeasurement] = React.useState(
    product?.fluid_measurement || 'QUART'
  )
  const [isPublished, setPublished] = React.useState(
    product ? product.published : true
  )
  const [transmissionModel, setTransmissionModel] = React.useState(
    product?.transmission_model || ''
  )

  const [unitPrice, setUnitPrice] = React.useState(
    product?.unit_sale_price || 0
  )
  const [handle, setHandle] = React.useState(product?.handle || '')
  const [coreCharge, setCoreCharge] = React.useState(product?.core_charge || 0)
  const [vendor, setVendor] = React.useState(product?.vendor || '')
  const [fluidTitle, setFluidTitle] = React.useState(product?.fluid_title || '')
  const [cost, setCost] = React.useState(product?.cost || 0)
  const [fuelType, setFuelType] = React.useState(product?.fuel_type || '')
  const [standardWarranty, setStandardWarranty] = React.useState(product?.standard_warranty || '')
  const [extendedWarranty, setExtendedWarranty] = React.useState(product?.extended_warranty || '')
  const [additionalInfo, setAdditionalInfo] = React.useState(product?.additional_info || '')

  const isTransmissionCategory = category === 'TRANSMISSION'

  const handlePublished = () => {
    setPublished(!isPublished)
  }

  const handleTransmissionChange = () => {
    if (category === 'TRANSMISSION') {
      setCategory('TRANSMISSION_FLUID')
    } else {
      setCategory('TRANSMISSION')
    }
  }

  const handleFluidSizeChange = () => {
    if (fluidMeasurement === 'QUART') {
      setFluidMeasurement('LITER')
    } else {
      setFluidMeasurement('QUART')
    }
  }

  const handleDelete = async () => {
    if (!product) return
    await deleteProduct({ product })
    setProduct(null)
  }

  const handleCreateUpdate = async () => {
    const payload = {
      id: product?.id || null,
      handle: handle,
      published: isPublished,
      category,
      transmission_model: transmissionModel,
      vendor,
      cost: Number(cost),
      unit_sale_price: Number(unitPrice),
      core_charge: Number(coreCharge),
      fluid_title: fluidTitle,
      fluid_measurement: fluidMeasurement,
      fuel_type: fuelType,
      standard_warranty: standardWarranty,
      extended_warranty: extendedWarranty,
      additional_info: additionalInfo,
    }
    if (!product) {
      delete payload.id
    }
    const productFromDb = await upsertProduct({
      product: payload,
    })
    setUpdated(true)
    setTimeout(() => {
      setProduct(productFromDb)
    }, 1500)
  }

  return (
    <Box>
      <Typography>Add New Product</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id='category-label'>Category</InputLabel>
        <Select
          labelId='category-label'
          value={category}
          onChange={handleTransmissionChange}
        >
          <MenuItem value={'TRANSMISSION'}>Transmisison</MenuItem>
          <MenuItem value={'TRANSMISSION_FLUID'}>Transmisison Fluid</MenuItem>
        </Select>
      </FormControl>
      <TextField
        value={handle}
        onChange={e => setHandle(e.target.value)}
        className={classes.input}
        label='Handle'
      />
      {isTransmissionCategory && (
        <TextField
          value={transmissionModel}
          onChange={e => setTransmissionModel(e.target.value)}
          className={classes.input}
          label='Transmission Model'
        />
      )}
      {isTransmissionCategory && (
        <TextField
          value={vendor}
          onChange={e => setVendor(e.target.value)}
          className={classes.input}
          label='Vendor'
        />
      )}
      {isTransmissionCategory && (
        <FormControl className={classes.formControl}>
          <InputLabel id='category-label'>Fuel Type</InputLabel>
          <Select
            labelId='category-label'
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          >
            <MenuItem value={'GAS'}>GAS</MenuItem>
            <MenuItem value={'DIESEL'}>DIESEL</MenuItem>
          </Select>
        </FormControl>
      )}
      {isTransmissionCategory && (
        <TextField
          value={standardWarranty}
          onChange={e => setStandardWarranty(e.target.value)}
          className={classes.input}
          label='Standard Warranty'
        />
      )}
      {isTransmissionCategory && (
        <TextField
          value={extendedWarranty}
          onChange={e => setExtendedWarranty(e.target.value)}
          className={classes.input}
          label='Extended Warranty'
        />
      )}
      {isTransmissionCategory && (
        <TextField
          value={additionalInfo}
          onChange={e => setAdditionalInfo(e.target.value)}
          className={classes.input}
          label='Additional Info'
        />
      )}
      {!isTransmissionCategory && (
        <TextField
          value={fluidTitle}
          onChange={e => setFluidTitle(e.target.value)}
          className={classes.input}
          label='Fluid Title'
        />
      )}
      {!isTransmissionCategory && (
        <FormControl className={classes.formControl}>
          <InputLabel id='fluid-label'>Fluid Size</InputLabel>
          <Select
            labelId='fluid-label'
            value={fluidMeasurement}
            onChange={handleFluidSizeChange}
          >
            <MenuItem value={'QUART'}>Quart</MenuItem>
          </Select>
        </FormControl>
      )}
      <Box>
        <TextField
          label='Cost'
          value={cost}
          className={classes.input}
          onChange={e => setCost(e.target.value)}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </Box>
      <Box>
        <TextField
          label='Flexor Unit Sale Price PKG'
          value={unitPrice}
          className={classes.input}
          onChange={e => setUnitPrice(e.target.value)}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </Box>
      {isTransmissionCategory && (
        <Box>
          <TextField
            label='Flexor Single Unit Sale Price'
            value={coreCharge}
            className={classes.input}
            onChange={e => setCoreCharge(e.target.value)}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
        </Box>
      )}
      <Box className={classes.input}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Published</FormLabel>
          <RadioGroup value={isPublished} onChange={handlePublished}>
            <FormControlLabel value={true} control={<Radio />} label='True' />
            <FormControlLabel value={false} control={<Radio />} label='False' />
          </RadioGroup>
        </FormControl>
      </Box>
      <Button
        className={classes.button}
        variant='contained'
        onClick={handleCreateUpdate}
      >
        {product ? 'Update' : 'Create'}
      </Button>
      {product && (
        <Button
          className={classes.button}
          variant='contained'
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
    </Box>
  )
}

export default CreateProduct
