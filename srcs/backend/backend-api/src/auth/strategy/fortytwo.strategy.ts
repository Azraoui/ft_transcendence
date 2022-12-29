import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-42";



@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
    
    constructor () {
        super({
            clientID: process.env.FORTYTWO_CLIENT_ID,
            clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/api/auth/42-redirect',
        });
    }

    async validate( accessToken: string,
                    refreshToken: string, profile: any,
                    done: VerifyCallback, ) : Promise<any>
    {
        const { username, name, emails, _json } = profile;
        const user = {
            username: username,
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            pictureLink: _json.image.link,
            accessToken,
            refreshToken,
        }
        done(null, user);
    }
}