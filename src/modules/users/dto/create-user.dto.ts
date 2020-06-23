import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '账户不能为空' })
  username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
  roldId?: string;
}
