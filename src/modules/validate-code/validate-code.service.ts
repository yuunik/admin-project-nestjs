import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import SvgCaptcha from 'svg-captcha';
import { ValidateCodeVo } from './vo/validate-code.vo';

const VALIDATE_CODE_TTL = 5 * 60 * 1000;

@Injectable()
export class ValidateCodeService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async validateCode(): Promise<ValidateCodeVo> {
    const captcha = SvgCaptcha.create({
      size: 4,
      noise: 2,
      color: true,
      background: '#cc9966',
    });

    // const code = captcha.text;
    const uuid = crypto.randomUUID();
    const key = uuid.replaceAll('-', '');

    const base64 = Buffer.from(captcha.data, 'utf-8').toString('base64');

    await this.cacheManager.set(key, captcha.text, VALIDATE_CODE_TTL);

    const url = `data:image/svg+xml;base64,${base64}`;

    return {
      codeKey: key,
      codeValue: url,
    };
  }
}
