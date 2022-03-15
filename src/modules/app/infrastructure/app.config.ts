import { get } from 'env-var';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig {
  public appVersion = get('APP_VERSION').default('v1').asString();
  public appPort = get('APP_PORT').default(3000).asPortNumber();
  public isDev =
    get('NODE_ENV').default('development').asString() !== 'production';
}
