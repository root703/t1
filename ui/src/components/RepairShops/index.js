import Box from '@material-ui/core/Box'
import RepairShopTable from './Table'
import Typography from '@material-ui/core/Typography'
import { useQuery } from 'react-query'
import { fetchAllRepairShops } from 'queries'
import Button from '@material-ui/core/Button'
import React from 'react'
import CreateEdit from './CreateEdit'

const RepairShops = ({
  isCreatingShop,
  setCreatingShop,
  setRepairShop,
  selectedRepairShop,
}) => {
  const {
    isLoading,
    error,
    data: repairShops,
    isFetching,
  } = useQuery('/repair-shops', fetchAllRepairShops)

  const createShop = () => {
    setCreatingShop(true)
  }

  const clearState = () => {
    setRepairShop(null)
  }

  if (isCreatingShop || selectedRepairShop)
    return <CreateEdit repairShop={selectedRepairShop} clearState={clearState}/>

  return (
    <Box>
      <Typography variant='h4'>Repair Shops</Typography>
      <Button onClick={createShop}>Add Shop</Button>
      <RepairShopTable
        repairShops={repairShops}
        setRepairShop={setRepairShop}
      />
    </Box>
  )
}

export default RepairShops
