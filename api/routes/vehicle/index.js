const generateVehicleRoutes = (app, prisma) => {
  app
    .route('/vehicles')
    .get(async (req, res) => {
      const vehicles = await prisma.vehicle.findMany()
      res.json(vehicles)
    })
    .post(async (req, res) => {
      const vehicle = req.body
      const existingVehicle = await prisma.vehicle.findFirst({
        where: {
          make: vehicle.make,
          model: vehicle.model,
          sub_model: vehicle.sub_model,
          year: vehicle.year,
        },
      })
      if (existingVehicle) {
        res.json(existingVehicle)
      } else {
        const newVehicle = await prisma.vehicle.create({
          data: vehicle,
        })
        res.json(newVehicle)
      }
    })
    .put((req, res) => {
      res.send('Update an Quote')
    })
    .delete((req, res) => {
      res.send('delete an Quote')
    })
}

module.exports = generateVehicleRoutes
