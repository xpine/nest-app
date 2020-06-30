import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { Menu } from 'src/modules/menu/menu.entity';
export class CreateRoleDto {
  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;
  menuIds?: [];
  menus: Menu[];
}
