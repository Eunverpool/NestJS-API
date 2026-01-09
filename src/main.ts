import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// // 클라이언트 측에서 전송한 데이터가 다음과 같을 경우
// {
// 　 "title": "Tenet",
// 　 "year": 2020,
// 　 "genres": ["Action", "Sci-Fi"],
// 　 "hack": "by me"
// }
// whitelist: true 로 설정했을 때 아래와 같이 데코레이터가 없는 속성("hack")은 제거되어 저장됨.
// {
// 　 id: 1,
// 　 title: 'Tenet',
// 　 year: 2020,
// 　 genres: ['Action', 'Sci-Fi'],
// }
// 2. forbidNonWhitelisted: true
//  "hack"이라는 속성은 화이트리스트에 존재하지 않으므로 HttpException 을 던지게됨
// response :
// {
// 　 "statusCode": 400,
// 　 "message": [ "property hack should not exist" ],
// 　 "error": "Bad Request"
// }
