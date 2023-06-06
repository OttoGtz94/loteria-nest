import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreatePlankDto } from './dto/create-plank.dto';
import { CardEntity } from 'src/card/entities/card.entity';
import { PlankEntity } from './entities/plank.entity';
import { DeletePlankDto } from './dto/delete-plank.dto';

@Injectable()
export class PlankService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    @InjectRepository(PlankEntity)
    private readonly plankRepository: Repository<PlankEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPlankDto: CreatePlankDto) {
    const planks = await this.generatePlanks(createPlankDto.numberOfPlanks);

    planks.forEach(async (plank) => {
      const plankEntity = this.plankRepository.create(plank);
      await this.plankRepository.save(plankEntity);
    });
    const key = planks[1].creationKey;
    return { msg: `Se crearon ${planks.length} tableros.`, key };
  }

  async generatePlanks(numberOfPlanks: number) {
    const cards = await this.cardRepository.find();

    const planks: PlankEntity[] = [];

    const key = this.generateCreationKey();
    for (let i = 1; planks.length < numberOfPlanks; i++) {
      const plank = new PlankEntity();
      plank.num = i;
      plank.cards = [];
      plank.creationKey = key;

      for (let j = 1; plank.cards.length < 16; j++) {
        const card = cards[Math.floor(Math.random() * cards.length)];
        if (!plank.cards.find((c) => (c.slug === card.slug ? true : false))) {
          plank.cards.push(card);
        }
      }

      plank.cards.sort((x: any, y: any) => x.slug.localeCompare(y.slug));

      let duplicatePlank: boolean = false;
      if (planks.length > 0) {
        planks.forEach((p) => {
          if (JSON.stringify(p.cards) !== JSON.stringify(plank.cards)) {
            duplicatePlank = false;
          } else {
            duplicatePlank = true;
          }
        });
      }
      if (!duplicatePlank) {
        planks.push(plank);
      }
    }

    return planks;
  }

  async getCardsForPlank(slug: string) {
    return await this.cardRepository.findOne({
      where: {
        slug,
      },
    });
  }

  generateCreationKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0';
    const lenghtKey = 6;
    let key = '';
    for (let i = 0; i < lenghtKey; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  async getPlanksForKey(creationKey: string) {
    try {
      const planksCards = await this.plankRepository.find({
        where: {
          creationKey,
        },
        relations: {
          cards: true,
        },
      });

      return planksCards;
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocurrio un error al obtener las tablas.',
      );
    }
  }

  async delete(deletePlankDto: DeletePlankDto) {
    const { creationKey } = deletePlankDto;
    const query = this.plankRepository.createQueryBuilder('plank');
    try {
      const planksDelete = await query
        .delete()
        .from(PlankEntity)
        .where('creationKey = :creationKey', {
          creationKey,
        })
        .execute();

      if (planksDelete.affected === 0)
        throw new NotFoundException(
          `No se encontraron tableros con la clave ${creationKey}`,
        );

      return {
        msg: `Se eliminaron los tableros con la llave: ${creationKey}`,
      };
    } catch (error) {
      if (error.status === 404)
        throw new NotFoundException(
          `No se encontraron tableros con la clave ${creationKey}`,
        );
      throw new BadRequestException('Ocurrio un error.');
    }
  }
}
