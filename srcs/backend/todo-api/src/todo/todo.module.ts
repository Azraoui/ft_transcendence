import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoService } from './service/todo.service';
import { TodoController } from './controller/todo.controller';

@Module({
  providers: [TodoService, PrismaService],
  controllers: [TodoController]
})
export class TodoModule {}
