import { Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

export class EntityPresenterMapper<DomainEntity = unknown, Entity = unknown> {
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
  public fromDomain(
    domainEntity: DomainEntity | DomainEntity[],
  ): Entity | Entity[] {
    return plainToClass(this.entity, domainEntity);
  }
}
