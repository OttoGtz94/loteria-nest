import { IsInt, IsPositive, IsString, Max, MinLength } from 'class-validator';

export class CreateCardDto {
  @IsString({ message: 'Debe de ser un string' })
  @MinLength(2, {
    message: 'EL nombre debe de tener por lo menos 2 letras',
  })
  name: string;

  @IsInt({ message: 'El número no debe contener decimales' })
  @Max(54, { message: 'Solo estan permitidas 54 cartas' })
  @IsPositive({ message: 'El número debe de ser positivo' })
  num: number;
}
