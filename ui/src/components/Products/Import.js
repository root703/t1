import React from 'react'
import Button from '@material-ui/core/Button'
import { ExcelRenderer } from 'react-excel-renderer'
import { addProducts } from 'queries'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  center: {
    textAlign: 'center',
  },
})

const formatExcelRow = row => {
  console.log('ROW', row)
  const type = row[3]
  const payload = {
    handle: row[0],
  }
  if (type === 'TRANSMISSION') {
    payload.transmission_model = row[1]
    payload.vendor = row[2]
    payload.category = 'TRANSMISSION'
    payload.unit_sale_price = Number(row[6])
    payload.core_charge = Number(row[7])
    payload.cost = Number(row[5])
    payload.published = row[8]
  } else {
    payload.fluid_title = row[1]
    payload.category = 'TRANSMISSION_FLUID'
    payload.fluid_measurement = row[4].toUpperCase()
    payload.unit_sale_price = Number(row[6])
    payload.cost = Number(row[5])
    payload.published = row[8]
  }
  return payload
}

const ImportProduct = () => {
  const [excelFile, setExcelFile] = React.useState(null)
  const [success, setSuccess] = React.useState(false)
  const [productsAdded, setProductsAdded] = React.useState(false)
  const classes = useStyles()

  const handleChange = e => {
    setExcelFile(e.target.files[0])
  }

  const handleImport = () => {
    if (!excelFile) return
    ExcelRenderer(excelFile, async (err, resp) => {
      if (err) {
        console.log('err', err)
        return
      }
      const { rows, cols } = resp
      const rowsToRender = [...rows]
      let columnNames = cols.map(col => col.name)
      const hasLetterHeader = cols[0].name === 'A'
      if (hasLetterHeader) {
        columnNames = rows[0]
        rowsToRender.shift()
      }
      const rowsWithContent = rowsToRender.filter(row => row.length > 0)
      const payloadForDb = rowsWithContent.map(row => formatExcelRow(row))
      const { count: productsAdded } = await addProducts({
        products: payloadForDb,
      })
      setSuccess(true)
      setProductsAdded(productsAdded)
    })
  }

  if (success)
    return (
      <Box className={classes.center}>
        <Typography>Added {productsAdded} products!</Typography>
      </Box>
    )

  return (
    <Box className={classes.center}>
      <Typography>Select an excel file to upload</Typography>
      <input type='file' onChange={handleChange} />
      <Button variant='contained' disbaled={!excelFile} onClick={handleImport}>
        Import
      </Button>
    </Box>
  )
}

export default ImportProduct
