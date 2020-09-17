'use strict'

module.exports = (db) => {
  /**
     * @swagger
     * definitions:
     *   Ride:
     *     type: object
     *     required:
     *       - rideID
     *       - startLat
     *       - startLong
     *       - endLat
     *       - endLong
     *       - riderName
     *       - driverName
     *       - driverVehicle
     *       - created
     *     properties:
     *       rideID:
     *         type: number
     *       startLat:
     *         type: number
     *       startLong:
     *         type: number
     *       endLat:
     *         type: number
     *       endLong:
     *         type: number
     *       riderName:
     *         type: string
     *       driverName:
     *         type: string
     *       driverVehicle:
     *         type: string
     *       created:
     *         type: number
     *         format: date-time
     *   Rides:
     *     type: array
     *     items:
     *       $ref: '#/definitions/Ride'
     */
  const createRideTableSchema = `
        CREATE TABLE Rides
        (
        rideID INTEGER PRIMARY KEY AUTOINCREMENT,
        startLat DECIMAL NOT NULL,
        startLong DECIMAL NOT NULL,
        endLat DECIMAL NOT NULL,
        endLong DECIMAL NOT NULL,
        riderName TEXT NOT NULL,
        driverName TEXT NOT NULL,
        driverVehicle TEXT NOT NULL,
        created DATETIME default CURRENT_TIMESTAMP
        )
    `

  db.run(createRideTableSchema)

  return db
}
