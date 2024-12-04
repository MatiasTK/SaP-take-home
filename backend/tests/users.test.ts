import request from 'supertest';
import { app } from '@/app';
import path from 'path';

beforeAll(async () => {
  const filePath = path.join(__dirname, 'data/mock.csv');
  await request(app).post('/api/files').attach('file', filePath);
});

describe('GET /api/users with valid id', () => {
  it('should return a json containing the id', async () => {
    // 1,Juan,Pérez,juan.perez@example.com,555-1234,2024-01-15,true
    const response = await request(app).get('/api/users?q=1');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '1',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      telefono: '555-1234',
      fecha_registro: '2024-01-15',
      activo: 'true',
    });
  });
});

describe('GET /api/users with valid nombre', () => {
  it('should return a json containing the nombre', async () => {
    // 1,Juan,Pérez,juan.perez@example.com,555-1234,2024-01-15,true
    const response = await request(app).get('/api/users?q=Juan');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '1',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      telefono: '555-1234',
      fecha_registro: '2024-01-15',
      activo: 'true',
    });
  });
});

describe('GET /api/users with valid apellido', () => {
  it('should return a json containing the apellido', async () => {
    const response = await request(app).get('/api/users?q=Pérez');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '1',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      telefono: '555-1234',
      fecha_registro: '2024-01-15',
      activo: 'true',
    });
  });
});

describe('GET /api/users with valid email', () => {
  it('should return a json containing the email', async () => {
    const response = await request(app).get('/api/users?q=juan.perez@example.com');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '1',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      telefono: '555-1234',
      fecha_registro: '2024-01-15',
      activo: 'true',
    });
  });
});

describe('GET /api/users with valid telefono', () => {
  it('should return a json containing the telefono', async () => {
    const response = await request(app).get('/api/users?q=555-1234');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '1',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      telefono: '555-1234',
      fecha_registro: '2024-01-15',
      activo: 'true',
    });
  });
});

describe('GET /api/users with valid fecha_registro', () => {
  it('should return a json containing the fecha_registro', async () => {
    const response = await request(app).get('/api/users?q=2024-01-15');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '1',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      telefono: '555-1234',
      fecha_registro: '2024-01-15',
      activo: 'true',
    });
  });
});

describe('GET /api/users with valid activo', () => {
  it('should return a json containing the activo', async () => {
    const response = await request(app).get('/api/users?q=true');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '1',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      telefono: '555-1234',
      fecha_registro: '2024-01-15',
      activo: 'true',
    });
  });
});

describe('GET /api/users with invalid query', () => {
  it('should return a json containing an error message', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Error: No se ha enviado ningún parámetro de búsqueda',
    });
  });
});

describe('GET /api/users with lowercase query', () => {
  it('should return a json containing the correct user', async () => {
    const response = await request(app).get('/api/users?q=juan');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '1',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      telefono: '555-1234',
      fecha_registro: '2024-01-15',
      activo: 'true',
    });
  });
});

describe('GET /api/users with valid activo and multiple results', () => {
  // 3,Carlos,Lopez,carlos.lopez@example.com,555-9101,2023-11-05,false
  // 5,Sofia,Garcia,sofia.garcia@example.com,555-3344,2024-04-12,false

  it('should return a json containing both users', async () => {
    const response = await request(app).get('/api/users?q=false');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '3',
      nombre: 'Carlos',
      apellido: 'Lopez',
      email: 'carlos.lopez@example.com',
      telefono: '555-9101',
      fecha_registro: '2023-11-05',
      activo: 'false',
    });
    expect(response.body.data).toContainEqual({
      id: '5',
      nombre: 'Sofia',
      apellido: 'Garcia',
      email: 'sofia.garcia@example.com',
      telefono: '555-3344',
      fecha_registro: '2024-04-12',
      activo: 'false',
    });
  });
});

describe('GET /api/users with partial valid name query', () => {
  it('should return a json containing the correct user', async () => {
    const response = await request(app).get('/api/users?q=Carl');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '3',
      nombre: 'Carlos',
      apellido: 'Lopez',
      email: 'carlos.lopez@example.com',
      telefono: '555-9101',
      fecha_registro: '2023-11-05',
      activo: 'false',
    });
  });
});

describe('GET /api/users with partial valid email query', () => {
  it('should return a json containing the correct user', async () => {
    const response = await request(app).get('/api/users?q=.lopez');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '3',
      nombre: 'Carlos',
      apellido: 'Lopez',
      email: 'carlos.lopez@example.com',
      telefono: '555-9101',
      fecha_registro: '2023-11-05',
      activo: 'false',
    });
  });
});

describe('GET /api/users with partial valid apellido query', () => {
  it('should return a json containing the correct user', async () => {
    const response = await request(app).get('/api/users?q=Lop');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '3',
      nombre: 'Carlos',
      apellido: 'Lopez',
      email: 'carlos.lopez@example.com',
      telefono: '555-9101',
      fecha_registro: '2023-11-05',
      activo: 'false',
    });
  });
});

describe('GET /api/users with partial valid telefono query', () => {
  it('should return a json containing the correct user', async () => {
    const response = await request(app).get('/api/users?q=555-91');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '3',
      nombre: 'Carlos',
      apellido: 'Lopez',
      email: 'carlos.lopez@example.com',
      telefono: '555-9101',
      fecha_registro: '2023-11-05',
      activo: 'false',
    });
  });
});

describe('GET /api/users with partial valid fecha_registro query', () => {
  it('should return a json containing the correct user', async () => {
    const response = await request(app).get('/api/users?q=2023-11');

    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual({
      id: '3',
      nombre: 'Carlos',
      apellido: 'Lopez',
      email: 'carlos.lopez@example.com',
      telefono: '555-9101',
      fecha_registro: '2023-11-05',
      activo: 'false',
    });
  });
});

describe('GET /api/users with non existent user', () => {
  it('should return a json containing an empty array', async () => {
    const response = await request(app).get('/api/users?q=999');

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });
});
