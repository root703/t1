import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MuiTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from 'components/common/PaginationActions'
import dayjs from 'dayjs'
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tr: {
    '&:hover': {
      background: '#f1f1f1',
      cursor: 'pointer',
    },
  },
})

const ProductsTable = ({ products = [], setProduct }) => {
  const classes = useStyles()

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <MuiTable
        className={classes.table}
        size='small'
        aria-label='a dense table'
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='left'>Category</TableCell>
            <TableCell align='left'>Price</TableCell>
            <TableCell align='left'>Published?</TableCell>
            <TableCell align='left'>Date</TableCell>
            <TableCell align='left'>Fuel Type</TableCell>
            <TableCell align='left'>Standard Warranty</TableCell>
            <TableCell align='left'>Extended Warranty</TableCell>
            <TableCell align='left'>Additional Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? products.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
            : products
          ).map(product => {
            const {
              created_at: createdAt,
              id: productId,
              category,
              fluid_size: fluidSize,
              fluid_amount: fluidAmount,
              transmission_model: transmissionModel,
              fluid_title: fluidTitle,
              cost,
              published,
              unit_sale_price: salePrice,
              fuel_type: fuelType,
              standard_warranty: standardWarranty,
              extended_warranty: extendedWarranty,
              additional_info: additionalInfo
            } = product
            const title =
              category === 'TRANSMISSION' ? transmissionModel : fluidTitle
            const handleRowClick = () => {
              setProduct(product)
            }
            return (
              <TableRow
                className={classes.tr}
                onClick={handleRowClick}
                key={productId}
              >
                <TableCell align='left'>{title}</TableCell>
                <TableCell align='left'>{category}</TableCell>
                <TableCell align='left'>
                  ${salePrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </TableCell>
                <TableCell align='left'>
                  {published ? 'True' : 'False'}
                </TableCell>
                <TableCell align='left'>
                  {dayjs(createdAt).format('l')}
                </TableCell>
                <TableCell align='left'>
                  {fuelType}
                </TableCell>
                <TableCell align='left'>
                  {standardWarranty}
                </TableCell>
                <TableCell align='left'>
                  {extendedWarranty}
                </TableCell>
                <TableCell align='left'>
                  {additionalInfo}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MuiTable>
    </TableContainer>
  )
}
export default ProductsTable
