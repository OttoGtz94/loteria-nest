import { PartialType } from '@nestjs/mapped-types';
import { CreatePlankDto } from './create-plank.dto';

export class UpdatePlankDto extends PartialType(CreatePlankDto) {}
