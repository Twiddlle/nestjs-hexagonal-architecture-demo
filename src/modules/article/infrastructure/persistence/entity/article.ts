import { ArticleEntity } from '../../../domain/entities/article.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article extends ArticleEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public body: string;

  @Column()
  public userId: string;

  @Column('timestamptz')
  public createdAt: Date;

  @Column('timestamptz')
  public updatedAt: Date;
}
