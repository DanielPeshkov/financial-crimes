import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth0AuthGuard } from './auth/auth0-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(Auth0AuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
