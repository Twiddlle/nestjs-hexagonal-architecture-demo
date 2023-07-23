export class ArticleUserEntity {
  public id: number;

  public name: string;

  public state: ArticleUserEntityState;
}

export const ArticleUserEntityState = ['active', 'inactive'] as const;
export type ArticleUserEntityState = typeof ArticleUserEntityState[number];
