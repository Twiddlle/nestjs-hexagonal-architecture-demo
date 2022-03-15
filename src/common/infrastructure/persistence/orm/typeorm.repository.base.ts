import { RepositoryPort, RepositoryQuery } from './repository.port';
import { Repository } from 'typeorm';
import { EntityOrmMapper } from '../entity-orm.mapper';

export abstract class TypeormRepositoryBase<DomainEntity, OrmEntity>
  implements RepositoryPort<DomainEntity>
{
  public constructor(
    protected readonly repository: Repository<OrmEntity>,
    protected readonly entityMapper: EntityOrmMapper<DomainEntity, OrmEntity>,
  ) {}

  public async delete(entity: DomainEntity): Promise<DomainEntity> {
    return this.entityMapper.toDomain(
      await this.repository.remove(this.entityMapper.fromDomain(entity)),
    );
  }

  public async find(
    query: RepositoryQuery<DomainEntity>,
    limit?: number,
    offset?: number,
  ): Promise<DomainEntity[]> {
    const ormEntities = await this.repository.find({
      where: query,
      skip: offset,
      take: limit,
    });
    return this.entityMapper.toDomain(ormEntities);
  }

  public async findById(id: number): Promise<DomainEntity> {
    return this.entityMapper.toDomain(await this.repository.findOne(id));
  }

  public async findOne(
    query: RepositoryQuery<DomainEntity>,
  ): Promise<DomainEntity> {
    const ormEntity = await this.repository.findOne({
      where: query,
    });
    return this.entityMapper.toDomain(ormEntity);
  }

  public async save(entity: DomainEntity): Promise<DomainEntity> {
    const ormEntity = this.entityMapper.fromDomain(entity);
    await this.repository.save(ormEntity as any);
    return this.entityMapper.toDomain(ormEntity);
  }

  public async saveMultiple(entities: DomainEntity[]): Promise<DomainEntity[]> {
    const ormEntities = this.entityMapper.fromDomain(entities);
    await this.repository.save(ormEntities as any);
    return this.entityMapper.toDomain(ormEntities);
  }
}
