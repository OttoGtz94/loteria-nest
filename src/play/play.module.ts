import { Module } from '@nestjs/common';
import { PlayService } from './play.service';
import { PlayController } from './play.controller';
import { CardModule } from 'src/card/card.module';
import { PlankModule } from 'src/plank/plank.module';

@Module({
  controllers: [PlayController],
  providers: [PlayService],
  imports: [CardModule, PlankModule],
})
export class PlayModule {}
