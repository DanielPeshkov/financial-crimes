import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get('*')
  async getDB(@Request() req) {
    return await this.appService.getDB(req.url);
  }

  @Post('*')
  async postDB(@Request() req, @Body() body) {
    return await this.appService.postDB(req.url, body);
  }

  @Put('*/:id')
  async putDB(@Param() path, @Body() body) {
    return await this.appService.putDB(path[0], path.id, body);
  }

  @Delete('*/:id')
  async deleteDB(@Param() path) {
    return await this.appService.deleteDB(path[0], path.id)
  }
}
