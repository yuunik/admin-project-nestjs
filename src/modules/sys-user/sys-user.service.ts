import { Injectable } from '@nestjs/common';
import SvgCaptcha from 'svg-captcha';
import { PrismaService } from '../../database/prisma/prisma.service';
import { LoginParamsDto } from './dto/login-params.dto';

@Injectable()
export class SysUserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.sys_user.findMany();
  }

  // 用户登录
  login(loginParams: LoginParamsDto) {
    console.log('登录参数:', loginParams);
    const captcha = SvgCaptcha.create({
      size: 4,
      noise: 2,
      color: true,
      background: '#cc9966',
    });

    const base64 = Buffer.from(captcha.data, 'utf-8').toString('base64');
    const captchaImage = `data:image/svg+xml;base64,${base64}`;

    return {
      data: captcha.data,
      text: captcha.text,
      image: captchaImage,
    };
  }
}
