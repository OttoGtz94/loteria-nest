import { Controller, Post, Body, Delete } from '@nestjs/common';
import { PlankService } from './plank.service';
import { CreatePlankDto } from './dto/create-plank.dto';
import { DeletePlankDto } from './dto/delete-plank.dto';

@Controller('plank')
export class PlankController {
  constructor(private readonly plankService: PlankService) {}

  @Post('create')
  create(@Body() createPlankDto: CreatePlankDto) {
    return this.plankService.create(createPlankDto);
  }

  @Delete('delete')
  delete(@Body() deletePlankDto: DeletePlankDto) {
    return this.plankService.delete(deletePlankDto);
  }
}
