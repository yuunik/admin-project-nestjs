import { Controller, Get } from '@nestjs/common';
import { SysUserService } from './sys-user.service';

@Controller('user')
export class SysUserController {
  constructor(private readonly sysUserService: SysUserService) {}

  @Get('/getAllUser')
  findAll() {
    return this.sysUserService.findAll();
  }
}
