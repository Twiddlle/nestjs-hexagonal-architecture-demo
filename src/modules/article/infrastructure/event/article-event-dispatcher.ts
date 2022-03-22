import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ArticleEventDispatcherInterface } from '../../domain/ports/article-event-dispatcher.interface';
import { ArticleStoredEvent } from '../../domain/events/article-stored.event';

@Injectable()
export class ArticleEventDispatcher implements ArticleEventDispatcherInterface {
  public constructor(private readonly eventBus: EventBus) {}

  public dispatchStore(articleStoredEvent: ArticleStoredEvent) {
    this.eventBus.publish(articleStoredEvent);
  }
}
