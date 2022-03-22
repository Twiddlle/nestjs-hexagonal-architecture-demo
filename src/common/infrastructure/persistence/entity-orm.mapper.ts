import { plainToClass } from 'class-transformer';
import { Type } from '@nestjs/common';

export class EntityOrmMapper<DomainEntity = unknown, Entity = unknown> {
  public constructor(
    private readonly domainEntity: Type<DomainEntity>,
    private readonly entity: Type<Entity>,
  ) {}

  public toDomain(entity: Entity[]): DomainEntity[];
  public toDomain(entity: Entity): DomainEntity;
  public toDomain(entity: Entity | Entity[]): DomainEntity | DomainEntity[] {
    return plainToClass(this.domainEntity, entity);
  }

  public fromDomain(entity: DomainEntity): Entity;
  public fromDomain(entity: DomainEntity[]): Entity[];
  public fromDomain(entity: Partial<DomainEntity>): Entity;
  public fromDomain(entity: Partial<DomainEntity>[]): Entity[];
  public fromDomain(
    domainEntity:
      | DomainEntity
      | DomainEntity[]
      | Partial<DomainEntity>
      | Partial<DomainEntity>[],
  ): Entity | Entity[] {
    return plainToClass(this.entity, domainEntity);
  }
}
