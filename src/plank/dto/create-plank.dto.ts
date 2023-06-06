import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Min } from 'class-validator';

export class CreatePlankDto {
  @ApiProperty({
    description: 'La cantidad de tableros a crear, minimo pueden ser 2',
    example: 5,
  })
  @IsInt({ message: 'El número no debe contener decimales' })
  @Min(2, { message: 'Se necesitan al menos 2 tablas para poder jugar' })
  @IsPositive({ message: 'El número debe de ser positivo' })
  numberOfPlanks: number;
}
