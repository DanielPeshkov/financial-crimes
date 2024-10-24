import { Controller, Get, Post, Param, Delete, Body, HttpCode, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './contact';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(201)
  create(@Body() newContact: Contact) {
    return this.contactService.create(newContact);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() contact: Contact) {
    return this.contactService.update(+id, contact);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
