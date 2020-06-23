import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
export class CreateMenuDto {
  parentId?: string;
  client: string;
  @IsNotEmpty({ message: '菜单名称不能为空', context: { code: 400 } })
  name: string;
  path: string;
  sort: number;
}
