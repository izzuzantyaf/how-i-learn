import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AnswerController } from '../answer/answer.controller';
import { AnswerModule } from '../answer/answer.module';
import { User } from '../user/entities/user.entity';
import { UserController } from '../user/user.controller';
import { UserModule } from '../user/user.module';
import { AttemptController } from './attempt.controller';
import { AttemptModule } from './attempt.module';
import { Attempt } from './entities/attempt.entity';

describe('AttemptController', () => {
  let controller: AttemptController;
  let answerController: AnswerController;
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AttemptModule, AnswerModule, UserModule],
    }).compile();

    controller = module.get<AttemptController>(AttemptController);
    answerController = module.get<AnswerController>(AnswerController);
    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByUserId()', () => {
    let user: User;
    const answersWithUserCf = [
      {
        id: 1,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menggambar atau menunjukkan atau memberikan peta',
      },
      {
        id: 2,
        learning_style_id: 'AUDITORY',
        expert_cf: 0.95,
        user_cf: 0.8,
        answer: 'Menjelaskan arah secara lisan',
      },
      {
        id: 3,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menulis arah',
      },
      {
        id: 4,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Pergi dengannya',
      },
      {
        id: 5,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Melihat diagram saja',
      },
      {
        id: 6,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Mendengarkan',
      },
      {
        id: 7,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Membaca kalimat – kalimat saja',
      },
      {
        id: 8,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menontonnya',
      },
      {
        id: 9,
        learning_style_id: 'VISUAL',
        expert_cf: 0.9,
        user_cf: 0.8,
        answer:
          'Menggunakan peta untuk melihatkan kepada mereka tempat yang indah',
      },
      {
        id: 10,
        learning_style_id: 'AUDITORY',
        expert_cf: 0.89,
        user_cf: 0.8,
        answer: 'Menelepon, sms atau email kepada mereka',
      },
      {
        id: 11,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Memberi mereka brosur tentang tempat itu',
      },
      {
        id: 12,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menjelaskan beberapa garis besar yang akan mereka alami',
      },
      {
        id: 13,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Lihat di internet dan buku – buku masakan',
      },
      {
        id: 14,
        learning_style_id: 'AUDITORY',
        expert_cf: 0.95,
        user_cf: 0.8,
        answer: 'Meminta saran teman',
      },
      {
        id: 15,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menggunakan bantuan resep',
      },
      {
        id: 16,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Memasak sesuatu yang kamu tahu tanpa resep',
      },
      {
        id: 17,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menunjukkan peta dan gambar-gambar di internet',
      },
      {
        id: 18,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Berbicara dan menyusun informasi tentang itu',
      },
      {
        id: 19,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Memberikan buku petunjuk tentang kehidupan area itu',
      },
      {
        id: 20,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Mengajak mereka terjun kesana',
      },
      {
        id: 21,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Melihat bagus tidaknya desain',
      },
      {
        id: 22,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Mendengarkan penjelasan dari penjual',
      },
      {
        id: 23,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Membaca secara detail atau mengecek lewat internet',
      },
      {
        id: 24,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Mencoba atau mengecek terlebih dahulu',
      },
      {
        id: 25,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Dari diagram, peta atau bagan untuk melihat petunjuknya',
      },
      {
        id: 26,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Mendengarkan penjelasan dari seseorang dan bertanya',
      },
      {
        id: 27,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Melihat dari buku petunjuk atau manual',
      },
      {
        id: 28,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 0.8,
        user_cf: 0.8,
        answer: 'Hanya nonton',
      },
      {
        id: 29,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menunjukkan diagram atau bagian -bagian mana yang salah',
      },
      {
        id: 30,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menjelaskan di mana letak kesalahannya',
      },
      {
        id: 31,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer:
          'Memberikan sesuatu untuk kamu baca dan menjelaskan apa yang salah',
      },
      {
        id: 32,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menggunakan suatu alat dan menunjukan apa yang salah',
      },
      {
        id: 33,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Mengikuti petunjuk dari buku',
      },
      {
        id: 34,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Berbicara dengan orang yang tahu tentang program itu',
      },
      {
        id: 35,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Membaca petunjuknya',
      },
      {
        id: 36,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menggunakan internet',
      },
      {
        id: 37,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Dengan desain yang menarik dan bagian-bagiannya',
      },
      {
        id: 38,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        user_cf: 0.8,
        answer:
          'Dari web yang bisa mendengarkan musik, dari radio atau wawancara',
      },
      {
        id: 39,
        learning_style_id: 'READ_WRITE',
        expert_cf: 0.9,
        user_cf: 0.8,
        answer: 'Penjelasan yang sangat menarik dari daftar dan keterangan',
      },
      {
        id: 40,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Sesuatu yang gampang dibuka dan dicoba',
      },
      {
        id: 41,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Dari penampilannya',
      },
      {
        id: 42,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Dari teman yang merekomendasi',
      },
      {
        id: 43,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Dari bagian – bagian yang gampang dibaca',
      },
      {
        id: 44,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Dari kisah nyata, pengalaman dan contoh',
      },
      {
        id: 45,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Petunjuk langsung dari kamera dan bagian-bagiannya',
      },
      {
        id: 46,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        user_cf: 0.8,
        answer:
          'Kesempatan untuk bertanya dan berbicara tentang gambar-gambar di kamera',
      },
      {
        id: 47,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer:
          'Kamu membaca dan menulis dari petunjuk-petunjuk tentang apa yang akan kamu lakukan',
      },
      {
        id: 48,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Contoh-contoh foto yang bagus',
      },
      {
        id: 49,
        learning_style_id: 'VISUAL',
        expert_cf: 0.9,
        user_cf: 0.8,
        answer: 'Dari diagram, bagan atau grafik',
      },
      {
        id: 50,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        user_cf: 0.8,
        answer:
          'Atau akan melakukan tanya jawab, berbicara, atau dari diskusi grup, atau dari tamu',
      },
      {
        id: 51,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Kamu akan langsung membaca buku',
      },
      {
        id: 52,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Belajar secara langsung',
      },
      {
        id: 53,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Melihat dari grafik hasil yang telah kamu terima',
      },
      {
        id: 54,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Dari seseorang yang ikut ujian bersama kamu',
      },
      {
        id: 55,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menggunakan penjelasan dari hasilnya',
      },
      {
        id: 56,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menggunakan contoh dari apa yang telah kamu lakukan',
      },
      {
        id: 57,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Melihat orang lain makan apa atau melihat gambar menu',
      },
      {
        id: 58,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Mendengarkan yang pelayan dan teman kamu tawarkan',
      },
      {
        id: 59,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Memilih dari menu',
      },
      {
        id: 60,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Memilih sesuatu yang telah kamu makan sebelumnya',
      },
      {
        id: 61,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        user_cf: 0.8,
        answer:
          'Membuat diagram dan grafik yang akan membantu menjelaskan sesuatu',
      },
      {
        id: 62,
        learning_style_id: 'AUDITORY',
        expert_cf: 0.9,
        user_cf: 0.8,
        answer: 'Menulis poin – poin penting dan menghafal',
      },
      {
        id: 63,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Menulis ulang dan membacanya berulang-ulang',
      },
      {
        id: 64,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        user_cf: 0.8,
        answer: 'Mengumpulkan contoh-contoh dan cerita agar mudah presentasi',
      },
    ];
    beforeAll(async () => {
      user = (
        await userController.create({
          name: faker.name.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        })
      ).data;
      await answerController.submit({
        user_id: user.id,
        answersWithUserCf,
      });
      await answerController.submit({
        user_id: user.id,
        answersWithUserCf,
      });
    });
    // if user id is random string
    it(`should return an empty array if user id is not a number`, async () => {
      const response = await controller.findByUserId('abc');
      const attempts = response.data as Attempt[];
      expect(attempts.length).toBe(0);
    });
    // if user id is not found
    it(`should return an empty array if user id is not found`, async () => {
      const response = await controller.findByUserId('1000');
      const attempts = response.data as Attempt[];
      expect(attempts.length).toBe(0);
    });
    // if user id is found
    it(`should return an array of attempts`, async () => {
      const response = await controller.findByUserId(user.id.toString());
      const attempts = response.data as Attempt[];
      expect(
        attempts.some((attempt) => attempt instanceof Attempt),
      ).toBeTruthy();
    });
  });
});
