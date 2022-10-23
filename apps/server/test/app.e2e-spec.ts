import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';

describe('Application (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/user (POST)', async () => {
    const response = await request(app.getHttpServer()).post('/api/user').send({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: 'helloworld',
      role: 'user',
    });
    expect(response.statusCode).toEqual(201);
  });

  it('/api/user (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/user');
    expect(response.statusCode).toBe(200);
  });

  afterAll(() => {
    app.close();
  });
});
