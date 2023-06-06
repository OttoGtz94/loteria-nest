import { Controller, Post, Body, Delete } from '@nestjs/common';
import { PlankService } from './plank.service';
import { CreatePlankDto } from './dto/create-plank.dto';
import { DeletePlankDto } from './dto/delete-plank.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tableros')
@Controller('plank')
export class PlankController {
  constructor(private readonly plankService: PlankService) {}

  @ApiResponse({
    status: 400,
    description: 'Hubo un error al crear los tableros.',
  })
  @ApiResponse({
    status: 201,
    description: 'Se crearon los tableros.',
  })
  @Post('create')
  create(@Body() createPlankDto: CreatePlankDto) {
    return this.plankService.create(createPlankDto);
  }

  @ApiResponse({
    status: 404,
    description: 'No se encontro el tablero con la llave indicada.',
  })
  @ApiResponse({
    status: 400,
    description: 'Hubo un error al eliminar el tablero.',
  })
  @ApiResponse({
    status: 201,
    description: 'Se elimino el tablero.',
  })
  @Delete('delete')
  delete(@Body() deletePlankDto: DeletePlankDto) {
    return this.plankService.delete(deletePlankDto);
  }
}
