import { faker } from '@faker-js/faker';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Test, TestingModule } from '@nestjs/testing';
import { isJWT } from 'class-validator';
import { SuccessfulResponse } from 'src/lib/api-response';
import { UserController } from 'src/use-cases/user/user.controller';
import { UserModule } from 'src/use-cases/user/user.module';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';

describe('AuthController', () => {
  let controller: AuthController;
  let userController: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AuthModule],
    }).compile();

    controller = module.get(AuthController);
    userController = module.get(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('signin()', () => {
    const fakeUser = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: 'helloworld',
    };
    beforeAll(async () => {
      await userController.create(fakeUser);
    });
    it(`should return object instance of ${SuccessfulResponse.name} and valid access token`, async () => {
      const response = await controller.signin({
        body: { username: fakeUser.email, password: fakeUser.password },
      });
      expect(response).toBeInstanceOf(SuccessfulResponse);
      const access_token = response.data.access_token;
      expect(isJWT(access_token)).toBeTruthy();
    });
    it(`should throw ${UnauthorizedException.name} because user is not registred`, async () => {
      await expect(
        controller.signin({
          body: {
            username: faker.internet.email(),
            password: faker.internet.password(),
          },
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('verify()', () => {
    const fakeUser = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    let access_token: string;
    beforeAll(async () => {
      const createdUser = (await userController.create(fakeUser)).data;
      access_token = (
        await controller.signin({
          body: {
            username: createdUser.email,
            password: fakeUser.password,
          },
        })
      ).data.access_token;
    });
    it(`should return ${SuccessfulResponse.name} and decoded payload`, async () => {
      const response = await controller.verify({
        headers: { authorization: `Bearer ${access_token}` },
      });
      const decodedPayload = response.data;
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(decodedPayload.name).toEqual(fakeUser.name);
      expect(decodedPayload.email).toEqual(fakeUser.email);
      expect(decodedPayload).toHaveProperty('iat');
      expect(decodedPayload).toHaveProperty('exp');
    });
    it(`should throw ${UnauthorizedException.name} because access token is invalid`, async () => {
      await expect(
        controller.verify({
          headers: { authorization: `Bearer not_a_valid_access_token` },
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
