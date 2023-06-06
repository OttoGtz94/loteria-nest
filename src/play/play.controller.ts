import { Body, Controller, Post } from '@nestjs/common';
import { PlayService } from './play.service';
import { CreatePlayDto } from './dto/create-play.dto';

@Controller('play')
export class PlayController {
  constructor(private readonly playService: PlayService) {}
  @Post()
  play(@Body() createPlayDto: CreatePlayDto) {
    return this.playService.play(createPlayDto);
  }
}
