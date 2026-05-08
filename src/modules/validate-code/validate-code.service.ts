import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import SvgCaptcha from 'svg-captcha';
import { USER_VALIDATE_CACHE_KEY_PREFIX } from '../../common/constants/cache-key.constant';
import { ValidateCodeVo } from './vo/validate-code.vo';

const VALIDATE_CODE_TTL = 5 * 60 * 1000;

const randomHexColor = () => {
  const color = Math.floor(Math.random() * 0xffffff);
  return `#${color.toString(16).padStart(6, '0')}`;
};

@Injectable()
export class ValidateCodeService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async validateCode(): Promise<ValidateCodeVo> {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@', process.env);
    const captcha = SvgCaptcha.create({
      size: 4,
      noise: 2,
      color: true,
      background: randomHexColor(),
    });

    const code = captcha.text;
    const svgData = captcha.data;
    const uuid = crypto.randomUUID();
    const key = uuid.replaceAll('-', '');

    const base64 = Buffer.from(svgData, 'utf-8').toString('base64');
    await this.cacheManager.set(
      `${USER_VALIDATE_CACHE_KEY_PREFIX}${key}`,
      code,
    );

    const url = `data:image/svg+xml;base64,${base64}`;

    return {
      codeKey: key,
      codeValue: url,
    };
  }
}
