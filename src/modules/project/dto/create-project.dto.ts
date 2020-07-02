import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: '账户不能为空' })
  name: string;
  @IsNotEmpty({ message: '密码不能为空' })
  desc: string;
  createdBy: String;
  memberIds?: String[];
}
