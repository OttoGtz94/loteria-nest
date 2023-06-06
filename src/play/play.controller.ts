import { Body, Controller, Post } from '@nestjs/common';
import { PlayService } from './play.service';
import { CreatePlayDto } from './dto/create-play.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Jugar')
@Controller('play')
export class PlayController {
  constructor(private readonly playService: PlayService) {}
  @ApiResponse({
    status: 404,
    description: 'No se encontraron tarjetas o tableros.',
  })
  @ApiResponse({
    status: 201,
    description: 'Se jugo correctamente.',
  })
  @Post()
  play(@Body() createPlayDto: CreatePlayDto) {
    return this.playService.play(createPlayDto);
  }
}
