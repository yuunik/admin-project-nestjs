import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginParamsDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  @Length(4, 20, { message: '用户名长度必须在4到20个字符之间' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString()
  captcha: string;

  @IsNotEmpty({ message: '验证码key不能为空' })
  @IsString()
  codeKey: string;
}
