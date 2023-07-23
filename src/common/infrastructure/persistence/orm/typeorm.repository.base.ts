import { RepositoryPort, RepositoryQuery } from './repository.port';
import { Repository } from 'typeorm';

export abstract class TypeormRepositoryBase<DomainEntity, OrmEntity>
  implements RepositoryPort<DomainEntity>
{
  public constructor(protected readonly repository: Repository<OrmEntity>) {}

  protected abstract fromDomain(entity: DomainEntity): OrmEntity;
  protected abstract toDomain(entity: OrmEntity): DomainEntity;

  public async delete(entity: DomainEntity): Promise<DomainEntity> {
    return this.toDomain(await this.repository.remove(this.fromDomain(entity)));
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
    return ormEntities.map(this.toDomain);
  }

  public async findById(id: number): Promise<DomainEntity> {
    return this.toDomain(await this.repository.findOne(id));
  }

  public async findOne(
    query: RepositoryQuery<DomainEntity>,
  ): Promise<DomainEntity> {
    const ormEntity = await this.repository.findOne({
      where: query,
    });
    return this.toDomain(ormEntity);
  }

  public async save(entity: DomainEntity): Promise<DomainEntity> {
    const ormEntity = this.fromDomain(entity);
    await this.repository.save(ormEntity as any);
    return this.toDomain(ormEntity);
  }

  public async saveMultiple(entities: DomainEntity[]): Promise<DomainEntity[]> {
    const ormEntities = entities.map(this.fromDomain);
    await this.repository.save(ormEntities as any);
    return ormEntities.map(this.toDomain);
  }
}
