import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPostQuery } from 'src/components/shared/application/queries/GetPostQuery';
import { ApiResponse } from '@nestjs/swagger';
import { PostResponseDto } from 'src/components/blog/infrastructure/http/rest/dtos/PostResponseDto';
import { PostCreateResponseDto } from 'src/components/blog/infrastructure/http/rest/dtos/PostCreateResponseDto';
import { PostCreateRequestDto } from 'src/components/blog/infrastructure/http/rest/dtos/PostCreateRequestDto';
import { CreatePostCommand } from 'src/components/shared/application/commands/CreatePostCommand';

@Controller('posts')
export class PostController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get(':id')
  @ApiResponse({ type: PostResponseDto })
  async get(@Param('id', ParseIntPipe) id: number) {
    const post = await this.queryBus.execute(new GetPostQuery(id));

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  @Post()
  @ApiResponse({ type: PostCreateResponseDto })
  async create(
    @Body() postData: PostCreateRequestDto,
  ): Promise<PostCreateResponseDto> {
    const post = await this.commandBus.execute(
      new CreatePostCommand({
        postData,
      }),
    );

    if (!post) {
      throw new NotFoundException();
    }

    return { id: post.id };
  }
}
