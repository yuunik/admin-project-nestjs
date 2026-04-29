import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SysUserModule } from './sys-user/sys-user.module';

@Module({
  imports: [SysUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
