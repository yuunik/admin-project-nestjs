import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './common/guards/auth.guard';
import { PrismaModule } from './database/prisma/prisma.module';
import { SysUserModule } from './modules/sys-user/sys-user.module';
import { ValidateCodeModule } from './modules/validate-code/validate-code.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') ?? 'spzx-admin-secret',
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: 5 * 60 * 1000,
        stores: [
          createKeyv(
            configService.get<string>('REDIS_URL') ?? 'redis://127.0.0.1:6379',
          ),
        ],
      }),
    }),
    PrismaModule,
    SysUserModule,
    ValidateCodeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
