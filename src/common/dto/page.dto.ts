import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class PageDto {
  @IsNotEmpty({ message: 'pageSize不能为空' })
  pageSize: number;
  @IsNotEmpty({ message: 'page不能为空' })
  page: number;
}
