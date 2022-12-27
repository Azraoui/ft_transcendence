import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";


@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
    
    constructor () {
        super({
            clientID: process.env.FORTYTWO_CLIENT_ID,
            clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/api/auth/42-redirect',
            scope : ['email', 'profile'],
        });
    }

    async validate( accessToken: string, refreshToken: string, profile: any, done: VerifyCallback, ) : Promise<any>
    {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
            refreshToken,
        }
        done(null, user);
    }
}