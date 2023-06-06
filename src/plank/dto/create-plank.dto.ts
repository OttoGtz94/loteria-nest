import { IsInt, IsPositive, Min } from 'class-validator';

export class CreatePlankDto {
  @IsInt({ message: 'El número no debe contener decimales' })
  @Min(2, { message: 'Se necesitan al menos 2 tablas para poder jugar' })
  @IsPositive({ message: 'El número debe de ser positivo' })
  numberOfPlanks: number;
}
