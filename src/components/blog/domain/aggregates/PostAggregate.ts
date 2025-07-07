import { Post } from 'src/components/blog/domain/entities/Post';
import { PostUser } from 'src/components/blog/domain/entities/PostUser';

export interface PostAggregate extends Post {
  user: PostUser;
}
