import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get('*')
  getDB(@Request() req) {
    return this.appService.getDB(req.url);
  }

  @Post('*')
  postDB(@Request() req, @Body() body) {
    return this.appService.postDB(req.url, body);
  }

  @Put('*/:id')
  putDB(@Param() path, @Body() body) {
    return this.appService.putDB(path[0], path.id, body);
  }

  @Delete('*/:id')
  deleteDB(@Param() path) {
    return this.appService.deleteDB(path[0], path.id)
  }
}
