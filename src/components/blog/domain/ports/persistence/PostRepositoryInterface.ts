import { Post } from 'src/components/blog/domain/entities/Post';

export interface PostRepositoryInterface {
  findById(id: number): Promise<Post | undefined>;
  create(data: Omit<Post, 'createdAt' | 'updatedAt' | 'id'>): Promise<Post>;
}
