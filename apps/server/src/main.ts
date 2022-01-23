import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // registrasi pipe yang dibutuhkan
  app.useGlobalPipes(
    // ValidationPipe berfungsi untuk validasi struktur data yang dikirimkan ke server
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  // menjalankan server menggunakan port yang ada pada file .env kalau tidak ada, port 8080 akan digunakan
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
