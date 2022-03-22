import { ArticleStoredEvent } from '../events/article-stored.event';

export interface ArticleEventDispatcherInterface {
  dispatchStore(articleStoredEvent: ArticleStoredEvent);
}
