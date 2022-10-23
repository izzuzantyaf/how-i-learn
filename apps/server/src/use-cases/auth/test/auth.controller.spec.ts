import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { isJWT } from 'class-validator';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { UserController } from 'src/use-cases/user/user.controller';
import { UserModule } from 'src/use-cases/user/user.module';
import { AuthController } from '../auth.controller';
import { AuthModule } from '../auth.module';

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
    it(`harus berhasil login, return object bertipe ${SuccessfulResponse.name} berisi access_token`, async () => {
      const response = await controller.signin({
        user: { username: fakeUser.email, password: fakeUser.password },
      });
      expect(response).toBeInstanceOf(SuccessfulResponse);
      const access_token = response.data.access_token;
      expect(isJWT(access_token)).toBeTruthy();
    });
  });
});
