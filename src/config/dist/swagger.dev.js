"use strict";

var swaggerJsdoc = require('swagger-jsdoc');

var swaggerUi = require('swagger-ui-express');

var options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Electronic Wallet',
      description: 'Bài 97 Xây dựng hệ thống ví điện tử',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  // looks for configuration in specified directories
  apis: ['./src/routers/*.js']
};
var swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Documentation in JSON format

  app.get('/docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;