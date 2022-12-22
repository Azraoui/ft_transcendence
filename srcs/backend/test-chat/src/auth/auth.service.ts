import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    getWelcome(): string {
        return "Hello World";
    }
}