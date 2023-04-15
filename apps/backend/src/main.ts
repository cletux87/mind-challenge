import express from 'express';
import * as path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import router from './router';
import { signIn } from './handlers/auth';
import { validateAuthSchema } from './middleware/validators/auth';
import { protect } from './modules/auth';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api', protect, router);
app.post('/signin', validateAuthSchema, signIn);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
