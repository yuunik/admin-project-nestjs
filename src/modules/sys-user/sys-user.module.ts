import { Module } from '@nestjs/common';
import { SysUserController } from './sys-user.controller';
import { SysUserService } from './sys-user.service';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { ValidateCodeModule } from '../validate-code/validate-code.module';

@Module({
  imports: [PrismaModule, ValidateCodeModule],
  controllers: [SysUserController],
  providers: [SysUserService],
})
export class SysUserModule {}
