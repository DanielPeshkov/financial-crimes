import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ContactModule } from './contact/contact.module';
import { User } from './user/user';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';
import { Contact } from './contact/contact';
import { AddressModule } from './address/address.module';
import { Address } from './address/address';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { BusinessModule } from './business/business.module';
import { Business } from './business/business';
import { BusinessController } from './business/business.controller';
import { BusinessService } from './business/business.service';
import { IndividualModule } from './individual/individual.module';
import { Individual } from './individual/individual';
import { IndividualController } from './individual/individual.controller';
import { IndividualService } from './individual/individual.service';
import { OtherReportModule } from './other-report/other-report.module';
import { OtherReportController } from './other-report/other-report.controller';
import { OtherReportService } from './other-report/other-report.service';
import { OtherReport } from './other-report/other-report';
import { OtherIndividualModule } from './other-individual/other-individual.module';
import { OtherIndividual } from './other-individual/other-individual';
import { OtherIndividualController } from './other-individual/other-individual.controller';
import { OtherIndividualService } from './other-individual/other-individual.service';
import { OtherBusinessModule } from './other-business/other-business.module';
import { OtherBusiness } from './other-business/other-business';
import { OtherBusinessController } from './other-business/other-business.controller';
import { OtherBusinessService } from './other-business/other-business.service';
import { LaunderingReportModule } from './laundering-report/laundering-report.module';
import { LaunderingReport } from './laundering-report/laundering-report';
import { LaunderingReportController } from './laundering-report/laundering-report.controller';
import { LaunderingReportService } from './laundering-report/laundering-report.service';
import { LaunderingBusinessModule } from './laundering-business/laundering-business.module';
import { LaunderingBusiness } from './laundering-business/laundering-business';
import { LaunderingBusinessController } from './laundering-business/laundering-business.controller';
import { LaunderingBusinessService } from './laundering-business/laundering-business.service';
import { LaunderingIndividualModule } from './laundering-individual/laundering-individual.module';
import { LaunderingIndividual } from './laundering-individual/laundering-individual';
import { LaunderingIndividualService } from './laundering-individual/laundering-individual.service';
import { LaunderingIndividualController } from './laundering-individual/laundering-individual.controller';
import { InstitutionReportModule } from './institution-report/institution-report.module';
import { InstitutionReport } from './institution-report/institution-report';
import { InstitutionReportController } from './institution-report/institution-report.controller';
import { InstitutionReportService } from './institution-report/institution-report.service';
import { InstitutionBusinessModule } from './institution-business/institution-business.module';
import { InstitutionBusiness } from './institution-business/institution-business';
import { InstitutionBusinessController } from './institution-business/institution-business.controller';
import { InstitutionBusinessService } from './institution-business/institution-business.service';
import { InstitutionIndividualModule } from './institution-individual/institution-individual.module';
import { InstitutionIndividual } from './institution-individual/institution-individual';
import { InstitutionIndividualController } from './institution-individual/institution-individual.controller';
import { InstitutionIndividualService } from './institution-individual/institution-individual.service';
ConfigModule.forRoot();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env['DB_HOST']),
      port: Number(process.env['DB_PORT']),
      username: String(process.env['DB_USER']),
      password: String(process.env['DB_PASSWORD']),
      database: String(process.env['DB_DATABASE']),
      entities: [User, Contact, Address, Business, Individual, OtherReport, 
        OtherIndividual, OtherBusiness, LaunderingReport, LaunderingBusiness, 
        LaunderingIndividual, InstitutionReport, InstitutionBusiness, 
        InstitutionIndividual],
      synchronize: false,
    }),
    UserModule,
    ContactModule,
    AddressModule,
    BusinessModule,
    IndividualModule,
    OtherReportModule,
    OtherIndividualModule,
    OtherBusinessModule,
    LaunderingReportModule,
    LaunderingBusinessModule,
    LaunderingIndividualModule,
    InstitutionReportModule,
    InstitutionBusinessModule,
    InstitutionIndividualModule,
  ],
  controllers: [AppController, UserController, ContactController, AddressController, 
                BusinessController, IndividualController, OtherReportController, 
                OtherIndividualController, OtherBusinessController, 
                LaunderingReportController, LaunderingBusinessController, 
                LaunderingIndividualController, InstitutionReportController, 
                InstitutionBusinessController, InstitutionIndividualController],
  providers: [AppService, UserService, ContactService, AddressService, BusinessService, 
              IndividualService, OtherReportService, OtherIndividualService, 
              OtherBusinessService, LaunderingReportService, LaunderingBusinessService, 
              LaunderingIndividualService, InstitutionReportService, 
              InstitutionBusinessService, InstitutionIndividualService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
