const generateRepairShopRoutes = (app, prisma) => {
  app
    .route('/repair-shops')
    .get(async (req, res) => {
      const repairShops = await prisma.repairShop.findMany()
      res.json(repairShops)
    })
    .post(async (req, res) => {
      const repairShop = req.body
      const newRepairShop = await prisma.repairShop.create({
        data: repairShop,
      })
      res.json(newRepairShop)
    })
    .put(async (req, res) => {
      const repairShop = req.body
      const newRepairShop = await prisma.repairShop.update({
        where: { id: repairShop.id },
        data: {
          ...repairShop,
        },
      })
      res.json(newRepairShop)
    })
    .delete(async (req, res) => {
      const shop = req.body
      await prisma.repairShop.delete({
        where: {
          id: shop.id,
        },
      })
      res.json({ message: `shop with id: ${shop.id} deleted` })
    })
}

module.exports = generateRepairShopRoutes
