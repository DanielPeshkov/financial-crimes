import { Controller, Get, Param, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('*')
  getDB(@Request() req) {
    const path = req.url.substring(1)
    return this.appService.getDB(path);
  }
}
