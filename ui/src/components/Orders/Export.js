import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import Button from '@material-ui/core/Button'

const Export = ({ orders = [] }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const ordersForReport = orders
    .map(order => ({
      ...order,
      ...order.quote,
      vehicle: `${order.quote.vehicle.year} ${order.quote.vehicle.make} ${order.quote.vehicle.model} `,
      customer: `${order.quote?.customer?.first_name} ${order.quote?.customer?.last_name}`,
      repair_shop: `${order.quote.repair_shop.name}`,
    }))
    .map(product => {
      delete product.quote
      delete product.quote_id
      return product
    })

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(ordersForReport)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, 'orders' + fileExtension)
  }

  return <Button onClick={exportToCSV}>Export</Button>
}

export default Export
