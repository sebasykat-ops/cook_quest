import 'reflect-metadata';

import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createMainContainer } from '@shared/infrastructure/container/container';
import { createHttpApp } from '@shared/infrastructure/http/create-http-app';
import { seedData } from '@shared/infrastructure/seed-data';

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

  it('returns mission contract with missionId field', async () => {
    const container = await createMainContainer();
    await seedData(container);
    const app = createHttpApp(container);

    const response = await request(app).get('/missions/mission-1');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.missionId).toBe('mission-1');
    expect(response.body.data.id).toBeUndefined();
  });
});
