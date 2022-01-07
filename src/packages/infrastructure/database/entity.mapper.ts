import { plainToClass } from 'class-transformer';
import { Type } from '@nestjs/common';

export class EntityMapper<DomainEntity, Entity> {
  public constructor(
    private readonly domainEntity: Type,
    private readonly entity: Type,
  ) {}

  public toDomain(entity: Entity[]): DomainEntity[];
  public toDomain(entity: Entity): DomainEntity;
  public toDomain(entity: Entity | Entity[]): DomainEntity | DomainEntity[] {
    return plainToClass(this.domainEntity, entity);
  }

  public fromDomain(entity: DomainEntity): Entity;
  public fromDomain(entity: DomainEntity[]): Entity[];
  public fromDomain(
    domainEntity: DomainEntity | DomainEntity[],
  ): Entity | Entity[] {
    return plainToClass(this.entity, domainEntity);
  }
}
