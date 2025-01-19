import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT!, () => {
    console.log(`Server running at http://localhost:${process.env.PORT!} `);
  });
}

void bootstrap();
