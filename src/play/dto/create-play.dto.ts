import { IsString, Length } from 'class-validator';

export class CreatePlayDto {
  @IsString({ message: 'La clave de creación debe de ser un string.' })
  @Length(6, 6, { message: 'Ingresa los 6 caracteres de la clave de creación' })
  creationKey: string;
}
