import express from 'express';
import { Request, Response } from 'express';
import routes from '@/routes/api';

export const app = express();

export const userData: Array<Record<string, string>> = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
