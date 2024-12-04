import request from 'supertest';
import { app } from '@/app';
import path from 'path';

describe('POST /api/files with accepted file', () => {
  it('should upload a CSV file', async () => {
    const filePath = path.join(__dirname, 'examples/mock.csv');
    const response = await request(app).post('/api/files').attach('file', filePath);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'El archivo se cargó correctamente' });
  });
});

describe('POST /api/files with rejected file', () => {
  it('should not upload a non-CSV file', async () => {
    const filePath = path.join(__dirname, 'examples/mock.txt');
    const response = await request(app).post('/api/files').attach('file', filePath);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error: El tipo de archivo debe ser CSV' });
  });
});

describe('POST /api/files without file', () => {
  it('should not upload a file', async () => {
    const response = await request(app).post('/api/files');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error: No se ha subido ningún archivo' });
  });
});

describe('POST /api/files with empty csv file', () => {
  it('should not upload a file', async () => {
    const filePath = path.join(__dirname, 'examples/mock_empty.csv');
    const response = await request(app).post('/api/files').attach('file', filePath);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error: No se pudo cargar el archivo' });
  });
});
