import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cartas')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiResponse({
    status: 400,
    description: 'La carta ya existe.',
  })
  @ApiResponse({
    status: 201,
    description: 'La carta se creo correctamente.',
  })
  @Post('create-card')
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @ApiResponse({
    status: 500,
    description: 'Ocurrio algún error.',
  })
  @ApiResponse({
    status: 201,
    description: 'Se cargaron las cartas desde el archivo data.',
  })
  @Get('load-cards')
  load() {
    return this.cardService.loadData();
  }

  @ApiResponse({
    status: 404,
    description:
      'No se encontro la tarjeta con el slug pasado en el parametro.',
  })
  @ApiResponse({
    status: 400,
    description: 'Hubo un error al eliminar la tarjeta.',
  })
  @ApiResponse({
    status: 201,
    description: 'Se elimino la carta.',
  })
  @ApiParam({
    name: 'slug',
    required: true,
    description:
      'El slug se crea mediante el titulo, sustituyendo los espacios por guion bajo y en minusculas',
    example: 'el_gallo',
  })
  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.cardService.remove(slug);
  }
}
