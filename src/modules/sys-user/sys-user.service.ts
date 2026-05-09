import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Cache } from 'cache-manager';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { USER_VALIDATE_CACHE_KEY_PREFIX } from '../../common/constants/cache-key.constant';
import { PrismaService } from '../../database/prisma/prisma.service';
import { LoginParamsDto } from './dto/login-params.dto';

@Injectable()
export class SysUserService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly jwtService: JwtService,
  ) {}

  findAll() {
    return this.prisma.sys_user.findMany();
  }

  // 用户登录
  async login(loginParams: LoginParamsDto) {
    const codeKey = loginParams.codeKey;
    const captcha = loginParams.captcha;

    if (codeKey && captcha) {
      const validateCodeCacheKey = `${USER_VALIDATE_CACHE_KEY_PREFIX}${codeKey}`;
      const cacheCaptcha =
        (await this.cacheManager.get<string>(validateCodeCacheKey)) ?? '';

      if (
        cacheCaptcha &&
        cacheCaptcha.toLowerCase() === captcha.toLowerCase()
      ) {
        await this.cacheManager.del(validateCodeCacheKey);
      } else {
        throw new UnauthorizedException('验证码错误');
      }
    } else {
      throw new UnauthorizedException('验证码不能为空');
    }

    const userName = loginParams.username;
    const user = await this.prisma.sys_user.findFirst({
      where: { username: userName },
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    const password = loginParams.password;
    if (user.password !== password) {
      throw new UnauthorizedException('密码错误');
    }

    const payload = {
      sub: user.id.toString(),
      username: user.username,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    return {
      token,
      user: {
        id: user.id.toString(),
        username: user.username,
        name: user.name,
      },
    };
  }

  // 分页查询
  async queryByCondition(queryData: PaginationQueryDto) {
    const { page, pageSize } = queryData;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [data, total] = await Promise.all([
      this.prisma.sys_user.findMany({
        skip,
        take,
        orderBy: { create_time: 'desc' },
        where: { is_deleted: 0 },
      }),
      this.prisma.sys_user.count({
        where: { is_deleted: 0 },
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages,
    };
  }
}
