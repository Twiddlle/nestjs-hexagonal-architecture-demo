import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import pluralize from 'pluralize';

export class DbNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(targetName: string): string {
    return pluralize(targetName);
  }
}
