export class DbConfig {
  connectionString!: string;

  constructor(data: DbConfig) {
    Object.assign(this, data);
  }
}
