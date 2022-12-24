import { IsNotEmpty, Length } from "class-validator";

export class TodoDto {
    
    @IsNotEmpty({ message: 'The ToDo should have a title'})
    @Length(3, 255)
    title: string;

    description?: string;

    completed?: boolean;

    @IsNotEmpty({message: 'The ToDo should have a user'})
    @Length(3, 255)
    user: string;
}