import { Body,
         Controller,
         Delete,
         Get,
         Param,
         Post,
         Put, 
         UsePipes,
         ValidationPipe} from '@nestjs/common';

import { Todo } from '@prisma/client';
import { TodoDto } from '../dto/todo.dto';
import { TodoService } from '../service/todo.service';

@Controller('api/v1/todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    async getAllTodo(): Promise<Todo[]> {
        return this.todoService.getAllToDo();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTodo(@Body() postData: TodoDto): Promise<Todo> {
        return this.todoService.createToDo(postData);
    }

    @Get(':id')
    async getTodo(@Param('id') id: number): Promise<Todo | null> {
        return this.todoService.getToDo(id);
    }

    @Put(':id')
    async updateTodo(@Param('id') id: Number,@Body() putData): Promise<Todo> {
        return this.todoService.updateToDo(id, putData);
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: number): Promise<Todo> {
        return this.todoService.deleteToDo(id);
    }
}
