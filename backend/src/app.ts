import express from 'express';
import { Request, Response } from 'express';
import routes from '@/routes/api';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

// To avoid using the same port for the server in the tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}
