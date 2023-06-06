import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayDto } from './dto/create-play.dto';
import { CardService } from 'src/card/card.service';
import { PlankService } from 'src/plank/plank.service';

@Injectable()
export class PlayService {
  constructor(
    private readonly cardService: CardService,
    private readonly plankService: PlankService,
  ) {}

  async play(createPlayDto: CreatePlayDto) {
    const { creationKey } = createPlayDto;
    const shufflingCards = await this.cardService.shufflingCards();
    const planks = await this.plankService.getPlanksForKey(creationKey);

    if (planks.length === 0) {
      throw new NotFoundException('No se econtro tablero con ese código');
    }

    planks.forEach((p) => p.cards.sort(() => Math.random() - 0.5));

    const arr = [];

    let win = {};
    shufflingCards.forEach((card) => {
      planks.forEach((plank) => {
        if (plank.cards.length === 0)
          throw new NotFoundException('No se cargaron cartas');

        const existPlank = arr.filter((obj) => obj.table === plank.num);

        if (existPlank.length === 0) {
          arr.push({
            table: plank.num,
            cards: [],
          });
        }
        const cardSelect = plank.cards.filter(
          (cardPlank) => cardPlank.slug === card.slug,
        );
        if (cardSelect.length > 0) {
          arr.map(
            (obj) =>
              obj.table === plank.num && obj.cards.push(cardSelect[0].slug),
          );
        }
        arr.forEach((obj) => {
          if (obj.table === plank.num) {
            if (obj.cards.length === 16) {
              if (Object.entries(win).length === 0) {
                win = { msg: 'Loteria', ganador: obj.table, cards: obj.cards };
              }
            }
          }
        });
      });
    });
    return { win, details: { planks, shufflingCards } };
  }
}
