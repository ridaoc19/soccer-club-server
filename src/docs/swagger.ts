import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Football Club API',
      version: '1.0.0',
      description: 'API profesional con Express + TypeORM + PostgreSQL',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Servidor de Desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['src/modules/**/infrastructure/*.routes.ts'],
});
