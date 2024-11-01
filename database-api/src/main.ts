import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Eureka } from 'eureka-js-client';

async function bootstrap() {

  let ip = await getIp();
  let client = new Eureka({
      eureka: {
          host: 'localhost',
          port: 8761,
          servicePath: '/eureka/apps/'
      },
      instance: {
          app: 'db',
          instanceId: 'db',
          hostName: 'DATABASE',
          ipAddr: ip,
          port: {
              '$': 8000,
              '@enabled': true,
          },
          vipAddress: 'db',
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
  
    /**
     * Set environement variables
     */

    const app = await NestFactory.create(AppModule);  
    await app.listen(process.env.PORT ?? 3000);
  }, 1000);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: Number(process.env.PORT),
    }
  });
  await app.listen();
}
bootstrap();

async function getIp() {
  let resp = await fetch('http://ipecho.io/json').then(data => data.json())
                      .then(json => json.ip);
  return resp;
}
