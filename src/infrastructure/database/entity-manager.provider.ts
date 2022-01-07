import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class EntityManagerProvider {
  public constructor(
    @InjectEntityManager()
    public readonly entityManager: EntityManager,
  ) {}
}
