import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from '../../common/decorators/public.decorator';
import { ValidateCodeService } from '../validate-code/validate-code.service';
import { LoginParamsDto } from './dto/login-params.dto';
import { SysUserService } from './sys-user.service';

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

  @Post('/getUserListByCondition')
  getUserList(@Body() params: PaginationQueryDto) {
    return this.sysUserService.queryByCondition(params);
  }
}
