import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreatePhoneDto } from '../../phone/dto/create-phone.dto';

export class CreateContactDto {
  @IsString({ message: 'O nome deve ser uma string não vazia.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @MaxLength(100, { message: 'O nome ultrapassou os 100 caracteres.' })
  nome: string;

  @IsNotEmpty({ message: 'A idade não pode estar vazia.' })
  @IsInt({ message: 'A idade deve ser um Number.' })
  @Min(0)
  @Max(120, {
    message: 'A idade ultrapassou um valor válido',
  })
  idade: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePhoneDto)
  numero: CreatePhoneDto[];
}
