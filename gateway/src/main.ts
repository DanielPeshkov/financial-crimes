import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Eureka } from 'eureka-js-client';
import { setTimeout as sleep } from 'timers/promises';

async function bootstrap() {
  let ip = await getIp();
  let client = new Eureka({
      eureka: {
          host: 'eureka-service',
          port: 8761,
          servicePath: '/eureka/apps/'
      },
      instance: {
          app: 'gateway',
          instanceId: 'gateway',
          hostName: 'GATEWAY',
          ipAddr: ip,
          port: {
              '$': 3000,
              '@enabled': true,
          },
          vipAddress: 'gateway',
          dataCenterInfo: {
              '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
              'name': 'MyOwn',
          }
      }
  });

  await client.start((err) => {
    if (err) {
        console.log('error starting the eureka client')
        console.log(err)
    } else 
        console.log('Connected to Eureka Service Discovery');
  });

  await setTimeout(async () => {
    console.log('setTimeout')
    let count = 0;
    let interval = 1;
    let instance = await client.getInstancesByAppId('cache')[0];
    while (!instance) {
      console.log('Awaiting Cache connection...')
      await sleep(interval)
      if (interval < 1000) {
         interval *= 2;
      }
      instance = await client.getInstancesByAppId('cache')[0];
      count += 1;
      if (count > 20) {
        // console.log("Failed to load cache data, restarting...")
        // break;
        throw new Error("Failed to load cache data, restarting...");
      }
    }
    console.log(`http://${instance.ipAddr}:${instance.port['$']}`)

    /**
     * Set environement variables
     */

    const app = await NestFactory.create(AppModule);  
    await app.listen(3000);
  }, 1000);
}
bootstrap();

async function getIp() {
  let resp = await fetch('http://ipecho.io/json').then(data => data.json())
                      .then(json => json.ip);
  return resp;
}