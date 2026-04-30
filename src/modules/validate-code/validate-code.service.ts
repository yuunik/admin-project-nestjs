import { Injectable } from '@nestjs/common';
import SvgCaptcha from 'svg-captcha';
import { ValidateCodeVo } from './vo/validate-code.vo';

@Injectable()
export class ValidateCodeService {
  validateCode(): ValidateCodeVo {
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

    const url = `data:image/svg+xml;base64,${base64}`;

    return {
      codeKey: key,
      codeValue: url,
    };
  }
}
