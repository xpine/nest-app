import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
export class UpdateMenuDto {
  parentId?: string;
  client?: string;
  name?: string;
  path?: string;
  sort?: number;
}
