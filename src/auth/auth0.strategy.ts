// validates tokens from Auth0 by getting necessary keys
import { ConfigModule } from "@nestjs/config";

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";

ConfigModule.forRoot()

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            secretOrKeyProvider: passportJwtSecret({
                jwksUri: process.env.JWKSURI
            }),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            algorithms: ['RS256'],
            audience: process.env.AUDIENCE,
            issuer: process.env.ISSUER
        });
    }


    validate(payload: any) {
        console.log(payload);
        return payload;
    }

}
