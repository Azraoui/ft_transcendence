import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    getWelcome(): string {
        return "Welcome to test-chat";
    }
    getWelcomeToUsers(): string {
        return "Welcome to user-chat"
    }
}