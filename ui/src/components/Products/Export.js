import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import Button from '@material-ui/core/Button'

const Export = ({ products = [] }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const productsToRender = products.map(product => ({
    Handle: product.handle,
    Title: product.transmission_model || product.fluid_title,
    Vendor: product.vendor,
    Type: product.category,
    'Unit of Measure': product.fluid_measurement,
    'Flexor Cost': product.cost,
    'Flexor Unit Sale Price PKG': product.unit_sale_price,
    'Flexor Single Unit Sale Price': product.core_charge,
    Published: product.published,
  }))

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(productsToRender)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, 'products' + fileExtension)
  }

  return <Button onClick={exportToCSV}>Export</Button>
}

export default Export
