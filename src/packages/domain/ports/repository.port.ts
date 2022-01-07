export type RepositoryQuery<Entity> = {
  [K in keyof Entity]?: RepositoryQuery<Entity> | any;
};

export interface Save<Entity> {
  save(entity: Entity): Promise<Entity>;
}

export interface SaveMultiple<Entity> {
  saveMultiple(entities: Entity[]): Promise<Entity[]>;
}

export interface Delete<Entity> {
  delete(entity: Entity): Promise<Entity>;
}

export interface FindOne<Entity> {
  findOne(query: RepositoryQuery<Entity>): Promise<Entity>;
}

export interface Find<Entity> {
  find(
    query: RepositoryQuery<Entity>,
    limit?: number,
    offset?: number,
  ): Promise<Entity[]>;
}

export interface FindById<Entity> {
  findById(id: string | number): Promise<Entity>;
}

export interface RepositoryPort<Entity>
  extends Save<Entity>,
    SaveMultiple<Entity>,
    Delete<Entity>,
    FindOne<Entity>,
    Find<Entity>,
    FindById<Entity> {}
