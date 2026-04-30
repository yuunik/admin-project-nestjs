import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigIntSerializerInterceptor } from './common/interceptors/big-int-serializer.interceptor';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new BigIntSerializerInterceptor(),
    new ResponseTransformInterceptor(),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
