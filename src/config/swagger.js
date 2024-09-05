const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Electronic Wallet',
      description: 'Bài 97 Xây dựng hệ thống ví điện tử',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routers/*.js'], // Đường dẫn đến các file API của bạn
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  // Cung cấp Swagger UI tại đường dẫn /docs
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Cung cấp tài liệu Swagger JSON tại đường dẫn /swagger.json
  app.get('/swagger.json', (req, res) => {
    res.json(swaggerSpec);
  });
}

module.exports = {setupSwagger};
