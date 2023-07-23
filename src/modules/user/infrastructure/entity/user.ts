import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntityState } from '../../domain/entity/user.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ default: 0 })
  public articleCount: number;

  @Column({ type: 'int' })
  public state: UserState;
}

export const UserStateValue = [1, 2] as const;
export type UserStateValue = typeof UserStateValue[number];

export const UserState: { [key in UserEntityState]: UserStateValue } = {
  active: 1,
  inactive: 2,
} as const;

export type UserState = typeof UserState[keyof typeof UserState];
