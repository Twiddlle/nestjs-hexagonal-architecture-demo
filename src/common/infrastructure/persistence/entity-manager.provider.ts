import { Injectable } from '@nestjs/common';
import { EntityManager, EntityTarget } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class EntityManagerProvider {
  public constructor(
    @InjectEntityManager()
    public readonly entityManager: EntityManager,
  ) {}

  public getRepository<T>(ormEntity: EntityTarget<T>) {
    return this.entityManager.getRepository<T>(ormEntity);
  }
}
