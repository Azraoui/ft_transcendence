import { Body, Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from '../dto/todo.dto';

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) {}


    // this method allow me to get all todo datas
    async getAllToDo(): Promise<Todo[]>{
        return this.prisma.todo.findMany();
    }

    // this method allow me to get todo data by id (unique)
    async getToDo(id: Number): Promise<Todo | null> {
        return this.prisma.todo.findUnique({
            where: {id: Number(id)}
        })
    }

    // create data in database with prisma.todo.create
    async createToDo(data: TodoDto): Promise<Todo> {
        return this.prisma.todo.create({
            data,
        })
    }

    // update data in database with prisma.todo.update
    async updateToDo(id: Number,@Body() data: TodoDto): Promise<Todo> {
        return this.prisma.todo.update({
            where: {id: Number(id)},
            data
        })
    }

    // delete data in database with prisma.todo.delete
    async deleteToDo(id: Number): Promise<Todo> {
        return this.prisma.todo.delete ({
            where: {id: Number(id)}
        })
    }
}
