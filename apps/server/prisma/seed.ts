import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.question.createMany({
    data: [
      {
        id: 1,
        question:
          'Kamu ingin menolong seseorang untuk pergi ke bandara, ke pusat kota, dan ke stasiun kereta api, kamu akan melakukan apa?',
      },
      {
        id: 2,
        question:
          'Di sebuah web ada sebuah video yang menunjukkan bagaimana cara membuat grafik yang baik, ada orang yang berbicara, ada beberapa daftar yang harus dilakukan, dan beberapa diagram. Apa yang akan kamu lakukan?',
      },
      {
        id: 3,
        question:
          'Kamu merencanakan liburan bersama teman-teman, kamu ingin teman-teman merespon rencana kamu, apa yang akan kamu lakukan?',
      },
      {
        id: 4,
        question:
          'Kamu ingin memasak sesuatu untuk seseorang, apa yang akan kamu lakukan?',
      },
      {
        id: 5,
        question:
          'Sebuah grup wisatawan ingin belajar tentang kehidupan di wilayah kamu, apa yang akan kamu lakukan?',
      },
      {
        id: 6,
        question:
          'Kamu ingin membeli sebuah kamera digital atau ponsel dengan bermacam-macam harga, keputusan apa yang akan kamu ambil?',
      },
      {
        id: 7,
        question:
          'Apakah kamu ingat tentang bagaimana kamu belajar sesuatu yang baru. Hindari gerakan secara langsung seperti mengendarai sepeda, kamu akan belajar dari siapa?',
      },
      {
        id: 8,
        question:
          'Kamu punya masalah dengan perasaan kamu, apa yang ingin dokter bantu untuk kamu?',
      },
      {
        id: 9,
        question:
          'Kamu ingin belajar program baru, keterampilan atau game di komputer. Apa yang akan kamu lakukan?',
      },
      { id: 10, question: 'Saya menyukai situs yang mempunyai?' },
      {
        id: 11,
        question:
          'Kalau melihat harga, keputusan apa yang akan mempengaruhi kamu untuk membeli buku nonfiksi?',
      },
      {
        id: 12,
        question:
          'Kamu menggunakan sebuah buku, cd, dan situs untuk belajar pengambilan foto dengan kamera digital yang baru. Apa yang ingin kamu tanya?',
      },
      {
        id: 13,
        question:
          'Kamu memilih untuk menjadi guru atau menjadi pembawa acara. Kamu akan melihat dari siapa?',
      },
      {
        id: 14,
        question:
          'Kamu telah selesai mengikuti kejuaraan atau tes yang menginginkan hasilnya. Hasil apa yang kamu inginkan?',
      },
      {
        id: 15,
        question:
          'Kamu akan memilih makanan di restoran atau cafe. Apa yang akan kamu lakukan?',
      },
      {
        id: 16,
        question:
          'Kamu akan membuat pidato yang penting di sebuah konferensi atau wawancara pekerjaan. Apa yang akan kamu lakukan?',
      },
    ],
  });
  await prisma.learningStyle.createMany({
    data: [
      {
        id: 'VISUAL',
        name: 'Visual',
      },
      {
        id: 'AUDITORY',
        name: 'Auditory',
      },
      {
        id: 'READ_WRITE',
        name: 'Read/Write',
      },
      {
        id: 'KINESTHETIC',
        name: 'Kinesthetic',
      },
    ],
  });
  await prisma.answerChoice.createMany({
    data: [
      {
        question_id: 1,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Menggambar atau menunjukkan atau memberikan peta',
      },
      {
        question_id: 1,
        learning_style_id: 'AUDITORY',
        expert_cf: 0.95,
        answer: 'Menjelaskan arah secara lisan',
      },
      {
        question_id: 1,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Menulis arah',
      },
      {
        question_id: 1,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Pergi dengannya',
      },
      {
        question_id: 2,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Melihat diagram saja',
      },
      {
        question_id: 2,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        answer: 'Mendengarkan',
      },
      {
        question_id: 2,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Membaca kalimat – kalimat saja',
      },
      {
        question_id: 2,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Menontonnya',
      },

      {
        question_id: 3,
        learning_style_id: 'VISUAL',
        expert_cf: 0.9,
        answer:
          'Menggunakan peta untuk melihatkan kepada mereka tempat yang indah',
      },
      {
        question_id: 3,
        learning_style_id: 'AUDITORY',
        expert_cf: 0.89,
        answer: 'Menelepon, sms atau email kepada mereka',
      },
      {
        question_id: 3,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Memberi mereka brosur tentang tempat itu',
      },
      {
        question_id: 3,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Menjelaskan beberapa garis besar yang akan mereka alami',
      },
      {
        question_id: 4,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Lihat di internet dan buku – buku masakan',
      },
      {
        question_id: 4,
        learning_style_id: 'AUDITORY',
        expert_cf: 0.95,
        answer: 'Meminta saran teman',
      },
      {
        question_id: 4,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Menggunakan bantuan resep',
      },
      {
        question_id: 4,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Memasak sesuatu yang kamu tahu tanpa resep',
      },
      {
        question_id: 5,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Menunjukkan peta dan gambar-gambar di internet',
      },
      {
        question_id: 5,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        answer: 'Berbicara dan menyusun informasi tentang itu',
      },
      {
        question_id: 5,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Memberikan buku petunjuk tentang kehidupan area itu',
      },
      {
        question_id: 5,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Mengajak mereka terjun kesana',
      },

      {
        question_id: 6,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Melihat bagus tidaknya desain',
      },
      {
        question_id: 6,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        answer: 'Mendengarkan penjelasan dari penjual',
      },
      {
        question_id: 6,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Membaca secara detail atau mengecek lewat internet',
      },
      {
        question_id: 6,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Mencoba atau mengecek terlebih dahulu',
      },
      {
        question_id: 7,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Dari diagram, peta atau bagan untuk melihat petunjuknya',
      },
      {
        question_id: 7,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        answer: 'Mendengarkan penjelasan dari seseorang dan bertanya',
      },
      {
        question_id: 7,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Melihat dari buku petunjuk atau manual',
      },
      {
        question_id: 7,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 0.8,
        answer: 'Hanya nonton',
      },

      {
        question_id: 8,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Menunjukkan diagram atau bagian -bagian mana yang salah',
      },
      {
        question_id: 8,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        answer: 'Menjelaskan di mana letak kesalahannya',
      },
      {
        question_id: 8,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer:
          'Memberikan sesuatu untuk kamu baca dan menjelaskan apa yang salah',
      },
      {
        question_id: 8,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Menggunakan suatu alat dan menunjukan apa yang salah',
      },

      {
        question_id: 9,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Mengikuti petunjuk dari buku',
      },
      {
        question_id: 9,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        answer: 'Berbicara dengan orang yang tahu tentang program itu',
      },
      {
        question_id: 9,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Membaca petunjuknya',
      },
      {
        question_id: 9,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Menggunakan internet',
      },

      {
        question_id: 10,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Dengan desain yang menarik dan bagian-bagiannya',
      },
      {
        question_id: 10,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        answer:
          'Dari web yang bisa mendengarkan musik, dari radio atau wawancara',
      },
      {
        question_id: 10,
        learning_style_id: 'READ_WRITE',
        expert_cf: 0.9,
        answer: 'Penjelasan yang sangat menarik dari daftar dan keterangan',
      },
      {
        question_id: 10,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Sesuatu yang gampang dibuka dan dicoba',
      },

      {
        question_id: 11,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Dari penampilannya',
      },
      {
        question_id: 11,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        answer: 'Dari teman yang merekomendasi',
      },
      {
        question_id: 11,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Dari bagian – bagian yang gampang dibaca',
      },
      {
        question_id: 11,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Dari kisah nyata, pengalaman dan contoh',
      },
      {
        question_id: 12,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Petunjuk langsung dari kamera dan bagian-bagiannya',
      },
      {
        question_id: 12,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        answer:
          'Kesempatan untuk bertanya dan berbicara tentang gambar-gambar di kamera',
      },
      {
        question_id: 12,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer:
          'Kamu membaca dan menulis dari petunjuk-petunjuk tentang apa yang akan kamu lakukan',
      },
      {
        question_id: 12,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Contoh-contoh foto yang bagus',
      },

      {
        question_id: 13,
        learning_style_id: 'VISUAL',
        expert_cf: 0.9,
        answer: 'Dari diagram, bagan atau grafik',
      },
      {
        question_id: 13,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        answer:
          'Atau akan melakukan tanya jawab, berbicara, atau dari diskusi grup, atau dari tamu',
      },
      {
        question_id: 13,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Kamu akan langsung membaca buku',
      },
      {
        question_id: 13,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Belajar secara langsung',
      },

      {
        question_id: 14,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Melihat dari grafik hasil yang telah kamu terima',
      },
      {
        question_id: 14,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        answer: 'Dari seseorang yang ikut ujian bersama kamu',
      },
      {
        question_id: 14,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Menggunakan penjelasan dari hasilnya',
      },
      {
        question_id: 14,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Menggunakan contoh dari apa yang telah kamu lakukan',
      },

      {
        question_id: 15,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer: 'Melihat orang lain makan apa atau melihat gambar menu',
      },
      {
        question_id: 15,
        learning_style_id: 'AUDITORY',
        expert_cf: 1,
        answer: 'Mendengarkan yang pelayan dan teman kamu tawarkan',
      },
      {
        question_id: 15,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Memilih dari menu',
      },
      {
        question_id: 15,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Memilih sesuatu yang telah kamu makan sebelumnya',
      },

      {
        question_id: 16,
        learning_style_id: 'VISUAL',
        expert_cf: 1,
        answer:
          'Membuat diagram dan grafik yang akan membantu menjelaskan sesuatu',
      },
      {
        question_id: 16,
        learning_style_id: 'AUDITORY',
        expert_cf: 0.9,
        answer: 'Menulis poin – poin penting dan menghafal',
      },
      {
        question_id: 16,
        learning_style_id: 'READ_WRITE',
        expert_cf: 1,
        answer: 'Menulis ulang dan membacanya berulang-ulang',
      },
      {
        question_id: 16,
        learning_style_id: 'KINESTHETIC',
        expert_cf: 1,
        answer: 'Mengumpulkan contoh-contoh dan cerita agar mudah presentasi',
      },
    ],
  });
  await prisma.learningRecommendation.createMany({
    data: [
      {
        learning_style_id: 'VISUAL',
        name: 'Membaca diagram, mindmap, chart',
      },
      {
        learning_style_id: 'VISUAL',
        name: 'Mengubah tulisan menjadi diagram, mindmap, chart',
      },
      {
        learning_style_id: 'VISUAL',
        name: 'Tulisan berwarna',
      },
      {
        learning_style_id: 'VISUAL',
        name: 'Menggunakan font bervariasi',
      },
      {
        learning_style_id: 'VISUAL',
        name: 'Catatan dengan tata letak yang bagus',
      },
      {
        learning_style_id: 'VISUAL',
        name: 'Catatan dengan desain yang menarik',
      },
      {
        learning_style_id: 'VISUAL',
        name: 'Animasi',
      },
      {
        learning_style_id: 'VISUAL',
        name: 'Gambar ilustrasi',
      },
      {
        learning_style_id: 'AUDITORY',
        name: 'Debat',
      },
      {
        learning_style_id: 'AUDITORY',
        name: 'Diskusi',
      },
      {
        learning_style_id: 'AUDITORY',
        name: 'Mendengarkan podcast',
      },
      {
        learning_style_id: 'AUDITORY',
        name: 'Belajar sambil mendengarkan backsound',
      },
      {
        learning_style_id: 'AUDITORY',
        name: 'Seminar/webinar',
      },
      {
        learning_style_id: 'AUDITORY',
        name: 'Audio book',
      },
      {
        learning_style_id: 'AUDITORY',
        name: 'Cerita',
      },
      {
        learning_style_id: 'AUDITORY',
        name: 'Membaca nyaring',
      },
      {
        learning_style_id: 'READ_WRITE',
        name: 'Membaca buku',
      },
      {
        learning_style_id: 'READ_WRITE',
        name: 'Mencatat',
      },
      {
        learning_style_id: 'READ_WRITE',
        name: 'Merangkum',
      },
      {
        learning_style_id: 'READ_WRITE',
        name: 'Parafrasa',
      },
      {
        learning_style_id: 'READ_WRITE',
        name: 'Mendeskripsikan grafik menjadi tulisan',
      },
      {
        learning_style_id: 'READ_WRITE',
        name: 'Menggunakan heading dan list',
      },
      {
        learning_style_id: 'READ_WRITE',
        name: 'Membuat glosarium',
      },
      {
        learning_style_id: 'READ_WRITE',
        name: 'Mencetak materi belajar digital',
      },
      {
        learning_style_id: 'KINESTHETIC',
        name: 'Belajar dengan menggunakan contoh di kehidupan nyata',
      },
      {
        learning_style_id: 'KINESTHETIC',
        name: 'Demonstrasi',
      },
      {
        learning_style_id: 'KINESTHETIC',
        name: 'Aktivitas fisik',
      },
      {
        learning_style_id: 'KINESTHETIC',
        name: 'Mengajar orang lain',
      },
      {
        learning_style_id: 'KINESTHETIC',
        name: 'Trial and error',
      },
      {
        learning_style_id: 'KINESTHETIC',
        name: 'Belajar di luar ruangan',
      },
      {
        learning_style_id: 'KINESTHETIC',
        name: 'Bertanya ke orang lain',
      },
      {
        learning_style_id: 'KINESTHETIC',
        name: 'Merancang hal baru',
      },
    ],
  });
}
main()
  .then(async () => {
    console.info('Database seeding is done!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
