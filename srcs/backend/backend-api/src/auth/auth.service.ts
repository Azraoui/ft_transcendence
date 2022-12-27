import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    signIn() : string {
        return "you just signin"
    }

    signUp() : string {
        return "you just signup"
    }

    fortytwoLogin(req) {
        if (!req.user) {
            console.log("No user from 42")
            return "No user from 42"
        }

        return {
            message: "user information from 42",
            user: req.user,
        }
    }

}
