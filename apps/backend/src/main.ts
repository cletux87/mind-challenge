import express from 'express';
import * as path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/router';
import { signIn } from './handlers/auth';
import { validateAuthSchema } from './middleware/validators/auth';
import { protect } from './modules/auth';
// import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import swaggerDocument from './swagger.json';

/*
const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'LogRocket Express API with Swagger',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Alex',
        url: 'https://arkusnexus.com',
        email: 'alex@arkusnexus.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
  },
  apis: ['./routes/*.ts'],
  // apis: ['./routes/*.js'],
};
*/

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/version', (req, res) => {
  res.json({ version: '0.0.1' });
});
app.use('/api', protect, router);
app.post('/signin', validateAuthSchema, signIn);

const port = process.env.PORT || 3333;
// const specs = swaggerJsdoc(options);
/*
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
*/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
