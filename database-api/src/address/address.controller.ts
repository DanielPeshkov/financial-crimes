import { Controller, Get, Post, Param, Delete, Put, HttpCode, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './address';
import { MessagePattern } from '@nestjs/microservices';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // @Post()
  // @HttpCode(201)
  // create(@Body() newAddress: Address) {
  //   return this.addressService.create(newAddress);
  // }

  @MessagePattern({path: 'post/address'})
  create(address) {
      return this.addressService.create(address);
  }

  // @Get()
  // @HttpCode(200)
  // findAll() {
  //   return this.addressService.findAll();
  // }

  @MessagePattern({path: 'get/address'})
  findAll(data: string) {
      return this.addressService.findAll();    
  }

  // @Get(':id')
  // @HttpCode(200)
  // findOne(@Param('id') id: string) {
  //   return this.addressService.findOne(+id);
  // }

  @MessagePattern({path: 'getById/address'})
  findOne(id: number) {
    return this.addressService.findOne(id);
  }

  // @Put(':id')
  // @HttpCode(200)
  // update(@Param('id') id: string, @Body() address: Address) {
  //   return this.addressService.update(+id, address);
  // }

  @MessagePattern({path: 'putaddress'})
  update(payload: any) {
      let {id, body} = payload
      return this.addressService.update(+id, body);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // remove(@Param('id') id: string) {
  //   return this.addressService.remove(+id);
  // }

  @MessagePattern({path: 'deleteaddress'})
  delete(id: number) {
      return this.addressService.remove(id);
  }
}
