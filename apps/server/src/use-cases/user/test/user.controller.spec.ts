import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { UserModule } from 'src/use-cases/user/user.module';
import { User } from 'src/use-cases/user/entities/user.entity';
import { faker } from '@faker-js/faker';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { UpdateUserDto } from '../dto/user.dto';

const createFakeUser = () => ({
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: 'helloworld',
});

describe('UserController', () => {
  let controller: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();
    controller = module.get(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    const fakeUser = createFakeUser();
    it(`should return object instance of ${SuccessfulResponse.name} and created user`, async () => {
      const response = await controller.create(fakeUser);
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(response.data).toBeInstanceOf(User);
    });
    it(`should throw ${BadRequestException.name} because name is empty`, async () => {
      await expect(
        controller.create({
          ...fakeUser,
          name: null,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it(`should throw ${BadRequestException.name} because name is not string`, async () => {
      await expect(
        controller.create({
          ...fakeUser,
          name: 123 as unknown as string,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it(`should throw ${BadRequestException.name} because name exeeds max character`, async () => {
      await expect(
        controller.create({
          ...fakeUser,
          name: 'namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it(`should throw ${BadRequestException.name} because email is empty`, async () => {
      await expect(
        controller.create({ ...fakeUser, email: null }),
      ).rejects.toThrow(BadRequestException);
    });
    it(`should throw ${BadRequestException.name} because email is not string`, async () => {
      await expect(
        controller.create({ ...fakeUser, email: 1234556 as unknown as string }),
      ).rejects.toThrow(BadRequestException);
    });
    it(`should throw ${BadRequestException.name} because email is not email`, async () => {
      await expect(
        controller.create({
          ...fakeUser,
          email: 'this is not email',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it(`should throw ${BadRequestException.name} because password is empty`, async () => {
      await expect(
        controller.create({ ...fakeUser, password: null }),
      ).rejects.toThrow(BadRequestException);
    });
    it(`should throw ${BadRequestException.name} because password is not string`, async () => {
      await expect(
        controller.create({
          ...fakeUser,
          password: 12345 as unknown as string,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it(`should throw ${BadRequestException.name} because password length doesn't meet the mininum character`, async () => {
      await expect(
        controller.create({
          ...fakeUser,
          password: 'pass',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it(`should throw ${ConflictException.name} because email is already registered`, async () => {
      await expect(controller.create(fakeUser)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('getAll()', () => {
    it(`should return object instance of ${SuccessfulResponse.name} and the users data`, async () => {
      const response = await controller.getAll();
      const users = response.data as User[];
      expect(await controller.getAll()).toBeInstanceOf(SuccessfulResponse);
      expect(users.every((user) => user instanceof User)).toBeTruthy();
    });
  });

  describe('update()', () => {
    let storedUser: User;
    beforeAll(async () => {
      const fakeUser = createFakeUser();
      storedUser = (await controller.create(fakeUser)).data;
    });
    it(`should return object instance of ${SuccessfulResponse.name} and updated user`, async () => {
      const modifiedUser = { ...storedUser, name: faker.name.fullName() };
      const result = await controller.update({
        ...modifiedUser,
      } as UpdateUserDto);
      expect(result).toBeInstanceOf(SuccessfulResponse);
      expect(result.data.name).toEqual(modifiedUser.name);
    });
    it(`should throw ${BadRequestException.name} because name is not string`, async () => {
      await expect(
        controller.update({
          ...storedUser,
          name: 123 as unknown as string,
        } as UpdateUserDto),
      ).rejects.toThrow(BadRequestException);
    });
    it(`should throw ${BadRequestException.name} because name is empty`, async () => {
      await expect(
        controller.update({
          ...storedUser,
          name: '',
        } as UpdateUserDto),
      ).rejects.toThrow(BadRequestException);
    });
    it(`should throw ${BadRequestException.name} because name exeeds max character`, async () => {
      await expect(
        controller.update({
          ...storedUser,
          name: 'namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename',
        } as UpdateUserDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete()', () => {
    let userId: string | number;
    beforeAll(async () => {
      const storedfakeUser = (await controller.create(createFakeUser()))
        .data as User;
      userId = storedfakeUser.id;
    });
    it(`should return object instance of ${SuccessfulResponse.name}`, async () => {
      const response = await controller.delete(userId as string);
      expect(response).toBeInstanceOf(SuccessfulResponse);
    });
    it(`should throw ${BadRequestException.name} because the id is not valid`, async () => {
      await expect(controller.delete('not a valid id')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
