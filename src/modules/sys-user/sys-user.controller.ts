import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { LoginParamsDto } from './dto/login-params.dto';
import { SysUserService } from './sys-user.service';
import { ValidateCodeService } from '../validate-code/validate-code.service';

@Controller('user')
export class SysUserController {
  constructor(
    private readonly sysUserService: SysUserService,
    private readonly validateCodeService: ValidateCodeService,
  ) {}

  @Get('/getAllUser')
  findAll() {
    return this.sysUserService.findAll();
  }

  @Post('/login')
  @Public()
  login(@Body() loginParams: LoginParamsDto) {
    return this.sysUserService.login(loginParams);
  }

  @Get('/getCaptcha')
  @Public()
  getCaptcha() {
    return this.validateCodeService.validateCode();
  }
}
