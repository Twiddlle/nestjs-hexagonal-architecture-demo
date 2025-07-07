import { Post } from 'src/components/blog/domain/entities/Post';
import { PostRepositoryInterface } from 'src/components/blog/domain/ports/persistence/PostRepositoryInterface';
import { DbType } from 'src/db/dbTypes';
import { eq } from 'drizzle-orm';
import { posts } from 'src/db/schema';

export class PostRepository implements PostRepositoryInterface {
  constructor(private readonly dbType: DbType) {}

  async create(data: Post): Promise<Post> {
    return (await this.dbType.insert(posts).values(data).returning())[0];
  }

  findById(id: number): Promise<Post | undefined> {
    return this.dbType.query.posts.findFirst({
      where: eq(posts.id, id),
    });
  }
}
