export class UserEntity {
  public id: number;

  public name: string;

  public articleCount: number;

  public state: UserEntityState;
}

export const UserEntityState = ['active', 'inactive'] as const;
export type UserEntityState = typeof UserEntityState[number];
