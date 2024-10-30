import { Module } from '@nestjs/common';
import { Auth0Strategy } from './auth0.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [ PassportModule ],
    providers: [ Auth0Strategy ]
})
export class AuthModule {}
