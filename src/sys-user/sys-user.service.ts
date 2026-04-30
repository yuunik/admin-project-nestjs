import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SysUserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.sys_user.findMany();
  }
}
