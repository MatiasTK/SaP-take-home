import request from 'supertest';
import { app } from '@/app';

describe('/', () => {
  it('should return 200 and hello world', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});
