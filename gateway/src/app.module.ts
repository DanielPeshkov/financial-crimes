import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([{
      name: 'SERVICE', 
      transport: Transport.TCP,
      options: {
        host: process.env['CACHE_HOST'],
        port: parseInt(process.env['CACHE_PORT'], 10),
      }
    }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
