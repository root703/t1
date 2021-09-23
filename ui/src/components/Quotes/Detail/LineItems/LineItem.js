import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import dayjs from 'dayjs'
import Typography from '@material-ui/core/Typography'

const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const useStyles = makeStyles({
  lineItem: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '.5rem 0',
  },
  lineItemTitle: {
    fontWeight: 'bold',
  },
  lineItemSubLabel: {
    fontStyle: 'italic',
  },
  lineItemPrice: {
    fontWeight: 'bold',
  },
})

const LineItem = ({ price, label, quantity, type, additionalInfo }) => {
  const classes = useStyles()
  const total = price ? Number(quantity) * price : 0
  const isEach = type === 'each'
  const isHour = type === 'hour'
  const isFluid = type === 'fluid'
  const isTransmission = type === 'transmission'
  const defaultSubLabel = `${quantity} @ $${price || '0'}`
  const eachSubLabel = `${quantity}x @ $${price || '0'} each`
  const hourSubLabel = `${quantity} hours @ $${price || '0'}/hour`
  const fluidSubLabel = `${quantity}qt @ $${price || '0'}/qt`

  // const hasNoFluid = isFluid && !price
  const hasNoTransmission = isTransmission && !price

  const getTotal = () => {
    // if (hasNoFluid || hasNoTransmission) return 'N/A'
    if (!price) return 'FREE'
    return `$${total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
  }

  const getSublabel = () => {
    if (isEach || isTransmission) return eachSubLabel
    if (isHour) return hourSubLabel
    if (isFluid) return fluidSubLabel
    if (hasNoTransmission) return 'N/A'
    return defaultSubLabel
  }

  return (
    <Box className={classes.lineItem}>
      <Box>
        <Typography className={classes.lineItemTitle}>{label}</Typography>
        <Typography className={classes.lineItemSubLabel}>
          {getSublabel()}
        </Typography>
        {isTransmission && (
          <Typography className={classes.lineItemSubLabel}>
            {additionalInfo}
          </Typography>
        )}
        {isFluid && (
          <Typography className={classes.lineItemSubLabel}>
            Capacity may vary based on engine type
          </Typography>
        )}
      </Box>
      <Typography className={classes.lineItemPrice}>
        {getTotal()}
      </Typography>
    </Box>
  )
}

export default LineItem
