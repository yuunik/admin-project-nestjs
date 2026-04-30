import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigIntInterceptorInterceptor } from './big-int-interceptor/big-int-interceptor.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 拦截器
  app.useGlobalInterceptors(new BigIntInterceptorInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
