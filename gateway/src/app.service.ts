import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(@Inject('DB_SERVICE') private client: ClientProxy) {}//

  getHello(): string {
    return 'Hello World!';
  }

  getDB(path: string) {
    const vars = path.split('/')
    const last = +vars.splice(vars.length-1, 1)[0]
    if (!isNaN(last)) {
      return this.client.send({path: 'getById' + vars.join('/')}, last)
    }
    return this.client.send({path: 'get' + path}, '');
  }
}
