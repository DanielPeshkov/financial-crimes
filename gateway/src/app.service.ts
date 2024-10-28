import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(@Inject('SERVICE') private client: ClientProxy) {}//

  getHello(): string {
    return 'Hello World!';
  }

  getDB(path: string) {
    const vars = path.split('/')
    const last = +vars.splice(vars.length-1, 1)[0]
    if (!isNaN(last)) {
      return this.client.send({time: Date.now(), path: 'getById' + vars.join('/')}, last)
    }
    return this.client.send({time: Date.now(), path: 'get' + path}, '');
  }

  postDB(path: string, body: any) {
    return this.client.send({time: Date.now(), path: 'post' + path}, body);
  }

  putDB(path: string, id: string, body: any) {
    return this.client.send({time: Date.now(), path: 'put' + path}, {id: id, body: body});
  }

  deleteDB(path: string, id: string) {
    return this.client.send({time: Date.now(), path: 'delete' + path}, id)
  }

  // JS Proxy version
  // getDB(path: string) {
  //   const vars = path.split('/')
  //   const last = +vars.splice(vars.length-1, 1)[0]
  //   if (!isNaN(last)) {
  //     return this.client.send({path: 'getById' + vars.join('/')}, {time: Date.now(), id: last})
  //   }
  //   return this.client.send({path: 'get' + path}, {time: Date.now(), data: ''});
  // }
}
