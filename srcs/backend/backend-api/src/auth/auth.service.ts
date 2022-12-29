import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {

    fortytwoLogin(data: AuthDto) {
        console.log(data);
        if (!data) {
            console.log(`No user from 42 ${data}`)
            return "No user from 42"
        }

        // validateUser () {

        // }
        return {
            message: "user information from 42",
            user: data,
        }
    }

}
