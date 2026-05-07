import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { ValidateCodeModule } from '../validate-code/validate-code.module';
import { SysUserController } from './sys-user.controller';
import { SysUserService } from './sys-user.service';

@Module({
  imports: [PrismaModule, ValidateCodeModule, JwtModule],
  controllers: [SysUserController],
  providers: [SysUserService],
})
export class SysUserModule {}
