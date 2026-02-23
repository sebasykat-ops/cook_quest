import 'reflect-metadata';

import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createMainContainer } from '../../src/shared-kernel/infrastructure/di/container';
import { createHttpApp } from '../../src/shared-kernel/infrastructure/http/create-http-app';
import { seedData } from '../../src/shared-kernel/infrastructure/seed-data';

describe('HTTP Endpoints', () => {
  it('returns health response contract', async () => {
    const container = await createMainContainer();
    await seedData(container);
    const app = createHttpApp(container);

    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe('ok');
  });

  it('validates payload for POST /recipes', async () => {
    const container = await createMainContainer();
    await seedData(container);
    const app = createHttpApp(container);

    const response = await request(app).post('/recipes').send({ title: '' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
