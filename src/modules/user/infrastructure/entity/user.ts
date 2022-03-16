import { UserEntity } from '../../domain/entity/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
}
