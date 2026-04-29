import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SysUserModule } from './sys-user/sys-user.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [SysUserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
