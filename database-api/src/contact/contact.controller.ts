import { Controller } from '@nestjs/common';
import { ContactService } from './contact.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @MessagePattern({path: 'post/contact'})
  create(contact) {
      return this.contactService.create(contact);
  }

  @MessagePattern({path: 'get/contact'})
  findAll(data: string) {
      return this.contactService.findAll();    
  }

  @MessagePattern({path: 'getById/contact'})
  findOne(id: number) {
      return this.contactService.findOne(id);
  }

  @MessagePattern({path: 'putcontact'})
  update(payload: any) {
      let {id, body} = payload
      return this.contactService.update(+id, body);
  }
  
  @MessagePattern({path: 'deletecontact'})
  delete(id: number) {
      return this.contactService.remove(id);
  }
}
