import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    signIn() : string {
        return "you just signin"
    }

    signUp() : string {
        return "you just signup"
    }

    googleLogin(req) {
        if (!req.user) {
            return "No user from google"
        }

        return {
            message: "user information from google",
            user: req.user,
        }
    }

}
