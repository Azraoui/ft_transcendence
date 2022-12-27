import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    signIn() : string {
        return "you just signin"
    }

    signUp() : string {
        return "you just signup"
    }

}
