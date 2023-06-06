import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { Repository } from 'typeorm';
import { cardsData } from './data/cards.data';

@Injectable()
export class CardService {
  private logger = new Logger('card-service');

  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    try {
      const card = this.cardRepository.create(createCardDto);
      await this.cardRepository.save(card);
      this.logger.log('Carta creada.');
      return { msg: `La carta ${card.name} fue creada.` };
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);
      if (error.errno === 1062)
        throw new BadRequestException('Nombre o número duplicado');

      throw new InternalServerErrorException('Error inesperado.');
    }
  }

  async remove(slug: string) {
    try {
      const card = await this.cardRepository.findOne({
        where: {
          slug,
        },
      });

      if (!card)
        throw new NotFoundException(
          `No se encontro la tarjeta con el slug ${slug}`,
        );

      await this.cardRepository.remove(card);

      return { msg: `Se elimino la tarjeta ${slug}` };
    } catch (error) {
      throw new BadRequestException('Hubo un error al eliminar la tarjeta');
    }
  }

  async shufflingCards() {
    try {
      const cards = await this.cardRepository.find();

      return cards.sort(() => Math.random() - 0.5);
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocurrio un error al barajar las cartas.',
      );
    }
  }

  async loadData() {
    const cards = cardsData;

    const query = this.cardRepository.createQueryBuilder('cards');

    try {
      await query.delete().where({}).execute();
      cards.forEach(async (card) => await this.create(card));
      return { msg: `Se cargaron ${cards.length} cartas` };
    } catch (error) {
      throw new InternalServerErrorException('Ha ocurrido un error');
    }
  }
}
