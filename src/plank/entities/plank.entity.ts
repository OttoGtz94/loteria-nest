import { CardEntity } from 'src/card/entities/card.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'plank' })
export class PlankEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer')
  num: number;

  @Column('varchar')
  creationKey: string;

  @ManyToMany(() => CardEntity, (card) => card.slug, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'plank-cards',
    inverseJoinColumn: { referencedColumnName: 'slug' },
  })
  cards: CardEntity[];
}
