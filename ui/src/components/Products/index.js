import Box from '@material-ui/core/Box'
import ProductsTable from './Table'
import Typography from '@material-ui/core/Typography'
import { useQuery } from 'react-query'
import { fetchAllProducts } from 'queries'
import Button from '@material-ui/core/Button'
import ProductCreateEdit from './CreateEdit'
import React from 'react'
import SnackBar from 'components/common/Snackbar'
import ImportProduct from './Import'
import Export from './Export'

const Products = ({
  isImportingProduct,
  setImportingProduct,
  isCreatingProduct,
  setCreatingStatus,
  selectedProduct,
  setProduct,
}) => {
  const {
    isLoading,
    error,
    data: products,
    isFetching,
  } = useQuery('/products', fetchAllProducts)
  const [hasUpdated, setUpdated] = React.useState(false)

  const createProduct = () => {
    setCreatingStatus(true)
  }

  const importProduct = () => setImportingProduct(true)
  const closeNoty = () => setUpdated(false)

  if (isImportingProduct) return <ImportProduct />

  return (
    <>
      {(selectedProduct || isCreatingProduct) && (
        <ProductCreateEdit
          product={selectedProduct}
          setProduct={setProduct}
          hasUpdated={hasUpdated}
          setUpdated={setUpdated}
        />
      )}
      {!(selectedProduct || isCreatingProduct) && (
        <Box>
          <Typography variant='h4'>Products</Typography>
          <Button onClick={createProduct}>Add Product</Button>
          <Button onClick={importProduct}>Import</Button>
          <Export products={products}/>
          <ProductsTable products={products} setProduct={setProduct} />
        </Box>
      )}
      <SnackBar
        open={hasUpdated}
        message='Product Updated!'
        close={closeNoty}
      />
    </>
  )
}

export default Products
