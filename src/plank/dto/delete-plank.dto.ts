import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class DeletePlankDto {
  @ApiProperty({
    description: 'La llave del tablero, deben de ser 6 digitos',
    example: 'mhhrzD',
  })
  @IsString({ message: 'La clave de creación debe de ser un string.' })
  @Length(6, 6, { message: 'Ingresa los 6 caracteres de la clave de creación' })
  creationKey: string;
}
