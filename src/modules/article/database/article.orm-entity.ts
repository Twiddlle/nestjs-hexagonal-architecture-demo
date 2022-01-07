import { ArticleEntity } from '../domain/entities/article.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class ArticleOrmEntity extends ArticleEntity {
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
