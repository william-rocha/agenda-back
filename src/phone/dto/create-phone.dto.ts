import { IsNotEmpty, IsString } from 'class-validator';
import { Contact } from '../../contact/entities/contact.entity';

export class CreatePhoneDto {
  @IsString({ message: 'O número deve ser uma string não vazia.' })
  @IsNotEmpty({ message: 'O número não pode estar vazio.' })
  numero: string;

  contato?: Contact;
}
