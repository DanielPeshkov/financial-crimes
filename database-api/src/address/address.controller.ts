import { Controller } from '@nestjs/common';
import { AddressService } from './address.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @MessagePattern({path: 'post/address'})
  create(address) {
      return this.addressService.create(address);
  }

  @MessagePattern({path: 'get/address'})
  findAll(data: string) {
      return this.addressService.findAll();    
  }

  @MessagePattern({path: 'getById/address'})
  findOne(id: number) {
    return this.addressService.findOne(id);
  }

  @MessagePattern({path: 'putaddress'})
  update(payload: any) {
      let {id, body} = payload
      return this.addressService.update(+id, body);
  }

  @MessagePattern({path: 'deleteaddress'})
  delete(id: number) {
      return this.addressService.remove(id);
  }
}
