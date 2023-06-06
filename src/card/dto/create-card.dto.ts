import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, Max, MinLength } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'El nombre de la tarjeta',
    example: 'El gallo',
  })
  @IsString({ message: 'Debe de ser un string' })
  @MinLength(2, {
    message: 'EL nombre debe de tener por lo menos 2 letras',
  })
  name: string;

  @ApiProperty({
    description: 'El numero de la tarjeta',
    example: 5,
  })
  @IsInt({ message: 'El número no debe contener decimales' })
  @Max(54, { message: 'Solo estan permitidas 54 cartas' })
  @IsPositive({ message: 'El número debe de ser positivo' })
  num: number;
}
