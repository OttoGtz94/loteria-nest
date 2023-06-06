import { Module } from '@nestjs/common';
import { PlankService } from './plank.service';
import { PlankController } from './plank.controller';
import { CardModule } from 'src/card/card.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlankEntity } from './entities/plank.entity';

@Module({
  controllers: [PlankController],
  providers: [PlankService],
  imports: [TypeOrmModule.forFeature([PlankEntity]), CardModule],
  exports: [TypeOrmModule, PlankService],
})
export class PlankModule {}
