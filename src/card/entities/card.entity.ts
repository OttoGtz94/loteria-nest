import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'card' })
@Unique(['num'])
@Unique(['slug'])
export class CardEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('text')
  name: string;

  @Column('integer')
  num: number;

  @Column('varchar')
  slug: string;

  @BeforeInsert()
  createSlug() {
    const slug = this.name.toLocaleLowerCase().replace(/\s+/g, '_');
    this.slug = slug;
  }
}
