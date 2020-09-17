'use strict';

const express = require('express');
const app = express();
const port = 8010;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Rides API",
      version: "1.0.0",
      description: "Rides API Information",
      contact: {
        name: "Dendy Ramdhan",
        email: "ramdhandendy@gmail.com",
      }
    },
    tags: [
      {
        name: "rides",
        description: "Rides API",
      },
    ],
    schemes: ["http"],
    host: "localhost:8010"
  },
  apis: ["./src/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

db.serialize(() => {
    buildSchemas(db);

    const app = require('./src/app')(db);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.listen(port, () => console.log(`App started and listening on port ${port}`));
});