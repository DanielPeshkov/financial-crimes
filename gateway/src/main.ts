import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Eureka } from 'eureka-js-client';
import { setTimeout as sleep } from 'timers/promises';

async function bootstrap() {
  let ip = await getIp();
  let client = new Eureka({
      eureka: {
          host: 'host.docker.internal',
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
    let interval = 1000;
    let instance = await client.getInstancesByAppId('cache')[0];
    while (!instance) {
      console.log('Awaiting Cache connection...')
      await sleep(interval)
      if (interval < 4000) {
         interval *= 2;
      }
      instance = await client.getInstancesByAppId('cache')[0];
    }
    console.log(`http://${instance.ipAddr}:${instance.port['$']}`)
    // process.env['CACHE_HOST'] = 'localhost'//instance.ipAddr
    // process.env['CACHE_PORT'] = '5000'//instance.port['$']
    // process.env['PORT'] = String(3000)
    console.log(`host: ${process.env['CACHE_HOST']}, port: ${process.env['CACHE_PORT']}`)

    /**
     * Set environement variables
     */

    const app = await NestFactory.create(AppModule);  
    await app.listen(process.env.PORT ?? 3000);
  }, 1000);
}
bootstrap();

async function getIp() {
  let resp = await fetch('http://ipecho.io/json').then(data => data.json())
                      .then(json => json.ip);
  return resp;
}