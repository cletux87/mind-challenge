const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: 'REST API', // by default: 'REST API'
    description: '', // by default: ''
  },
  host: 'localhost:3333', // by default: 'localhost:3000'
  basePath: '/api', // by default: '/'
  schemes: ['http'], // by default: ['http']
  consumes: ['application/json'], // by default: ['application/json']
  produces: ['application/json'], // by default: ['application/json']
  /*
  tags: [
    // by default: empty Array
    {
      name: '', // Tag name
      description: '', // Tag description
    },
    // { ... }
  ],*/
  tags: [],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object (Swagger 2.0)
  components: {}, // by default: empty object (OpenAPI 3.x)
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./apps/backend/src/routes/router.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
