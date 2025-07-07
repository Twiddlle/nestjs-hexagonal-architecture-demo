import { DbConfig } from 'src/modules/config/domain/DbConfig';

export class AppConfig {
  public appVersion!: string;
  public appPort!: number;

  db!: DbConfig;

  constructor(data: AppConfig) {
    Object.assign(this, data);
  }
}
