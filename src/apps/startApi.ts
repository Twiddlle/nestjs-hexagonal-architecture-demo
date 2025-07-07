import { createApi } from 'src/apps/createApi';
import { AppConfig } from 'src/modules/config/domain/AppConfig';

(async (): Promise<void> => {
  const app = await createApi();

  await app.listen(app.get(AppConfig).appPort);
  console.log(`Application is running on: ${await app.getUrl()}`);
})();
