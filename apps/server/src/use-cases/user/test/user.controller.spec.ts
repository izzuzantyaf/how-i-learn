import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { UserModule } from 'src/use-cases/user/user.module';
import { User } from 'src/core/entities/user.entity';
import { faker } from '@faker-js/faker';
import { BadRequestException, ConflictException } from '@nestjs/common';

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
    it(`harus berhasil menambahkan user ke database dan return object bertipe ${SuccessfulResponse.name}`, async () => {
      const response = await controller.create(fakeUser);
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(response.data).toBeInstanceOf(User);
    });
    it('harus gagal karena nama kosong', async () => {
      await expect(
        controller.create({
          ...fakeUser,
          name: null,
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena nama melebihi kapasitas karakter', async () => {
      await expect(
        controller.create({
          ...fakeUser,
          name: 'namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena email tidak valid', async () => {
      await expect(
        controller.create({
          ...fakeUser,
          email: 'salah',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena password tidak memenuhi minimal panjang karakter', async () => {
      await expect(
        controller.create({
          ...fakeUser,
          password: 'pass',
        }),
      ).rejects.toThrow(BadRequestException);
    });
    it('harus gagal karena email sudah terdaftar', async () => {
      await expect(controller.create(fakeUser)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('getAll()', () => {
    it(`harus return object bertipe ${SuccessfulResponse.name} dan data berupa array ${User.name}`, async () => {
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
    it('harus berhasil update user', async () => {});
    it('harus gagal update user karena id tidak valid');
    it('harus gagal karena nama melebihi batas maksimum');
    it('harus gagal karena email tidak valid');
    it('harus gagal karena password tidak sesuai syarat');
  });

  describe('delete()', () => {
    let userId: string | number;
    beforeAll(async () => {
      const storedfakeUser = (await controller.create(createFakeUser()))
        .data as User;
      userId = storedfakeUser.id;
    });
    it(`harus berhasil menghapus user dan return object bertipe ${SuccessfulResponse.name}`, async () => {
      const response = await controller.delete(userId as string);
      expect(response).toBeInstanceOf(SuccessfulResponse);
    });
    it('harus gagal menghapus user karena id tidak valid', async () => {
      await expect(controller.delete('salah')).rejects.toThrow();
    });
  });
});
