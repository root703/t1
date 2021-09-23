import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from 'components/common/PaginationActions'

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

const Address = ({ repairShop }) => {
  const { name, city, state, zip, street } = repairShop
  const addressLineOne = street
  const addressLineTwo = `${city}, ${state}, ${zip}`
  return (
    <Box>
      <Typography variant='body2'>{name}</Typography>
      <Typography variant='body2'>{addressLineOne}</Typography>
      <Typography variant='body2'>{addressLineTwo}</Typography>
    </Box>
  )
}

const RepairShopTable = ({ repairShops = [], setRepairShop }) => {
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
            <TableCell>Shop Id</TableCell>
            <TableCell align='left'>Shop</TableCell>
            <TableCell align='left'>Service Zip Codes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? repairShops.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : repairShops
          ).map(repairShop => {
            const { service_zips: serviceZipCodes, id: repairShopId } =
              repairShop
            const handleRowClick = () => {
              setRepairShop(repairShop)
            }
            return (
              <TableRow
                className={classes.tr}
                onClick={handleRowClick}
                key={repairShopId}
              >
                <TableCell component='th' scope='row'>
                  {repairShopId}
                </TableCell>
                <TableCell component='th' scope='row'>
                  <Address repairShop={repairShop} />
                </TableCell>
                <TableCell component='th' scope='row'>
                  {serviceZipCodes.join(', ')}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              // colSpan={8}
              count={repairShops.length}
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
export default RepairShopTable
