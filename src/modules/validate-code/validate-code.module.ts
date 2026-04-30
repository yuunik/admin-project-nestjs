import { Module } from '@nestjs/common';
import { ValidateCodeService } from './validate-code.service';

@Module({
  providers: [ValidateCodeService],
  exports: [ValidateCodeService],
})
export class ValidateCodeModule {}
