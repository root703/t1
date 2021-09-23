import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import Button from '@material-ui/core/Button'

const Export = ({ quotes = [] }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const quotesForReport = quotes.map(quote => ({
    ...quote,
    vehicle: `${quote.vehicle.year} ${quote.vehicle.make} ${quote.vehicle.model} `,
    customer: `${quote?.customer?.first_name} ${quote?.customer?.last_name}`,
    repair_shop: `${quote.repair_shop?.name}`,
  }))

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(quotesForReport)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, 'quotes' + fileExtension)
  }

  return <Button onClick={exportToCSV}>Export</Button>
}

export default Export
