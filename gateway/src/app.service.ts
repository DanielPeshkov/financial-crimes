import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { setTimeout as sleep } from 'timers/promises';

@Injectable()
export class AppService {

  constructor(@Inject('SERVICE') private client: ClientProxy) {}

  async getDB(path: string) {
    const vars = path.split('/')
    const last = +vars.splice(vars.length-1, 1)[0]
    let msg;
    if (!isNaN(last)) {
      msg = {time: Date.now(), path: 'getById' + vars.join('/')};
    } else {
      msg = {time: Date.now(), path: 'get' + path};
    }
    let response;
    while (true) {
      let success = true;
      response = await this.client.send(msg, last).toPromise().catch(err => {
        if (err.code == "ECONNREFUSED") {
          success = false;
          console.log("Connection Refused")
        }
      })
      if (success) {
        break
      } else {
        await sleep(20)
      }
    }
    return response
  }

  async postDB(path: string, body: any) {
    const msg = {time: Date.now(), path: 'post' + path};
    let response;
    while (true) {
      let success = true;
      response = await this.client.send(msg, body).toPromise().catch(err => {
        if (err.code == "ECONNREFUSED") {
          success = false;
          console.log("Connection Refused")
        }
      })
      if (success) {
        break
      } else {
        await sleep(20)
      }
    }
    return response
  }

  async putDB(path: string, id: string, body: any) {
    const msg = {time: Date.now(), path: 'put' + path};
    let response;
    while (true) {
      let success = true;
      response = await this.client.send(msg, {id: id, body: body}).toPromise().catch(err => {
        if (err.code == "ECONNREFUSED") {
          success = false;
          console.log("Connection Refused")
        }
      })
      if (success) {
        break
      } else {
        await sleep(20)
      }
    }
    return response
  }

  async deleteDB(path: string, id: string) {
    const msg = {time: Date.now(), path: 'delete' + path};
    let response;
    while (true) {
      let success = true;
      response = await this.client.send(msg, id).toPromise().catch(err => {
        if (err.code == "ECONNREFUSED") {
          success = false;
          console.log("Connection Refused")
        }
      })
      if (success) {
        break
      } else {
        await sleep(20)
      }
    }
    return response
  }
}
