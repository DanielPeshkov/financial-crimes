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
import { EmbezzlementReportModule } from './embezzlement-report/embezzlement-report.module';
import { EmbezzlementIndividualModule } from './embezzlement-individual/embezzlement-individual.module';
import { EmbezzlementBusinessModule } from './embezzlement-business/embezzlement-business.module';
import { InvestmentIndividualModule } from './investment-individual/investment-individual.module';
import { InvestmentBusinessModule } from './investment-business/investment-business.module';
import { InvestmentReportModule } from './investment-report/investment-report.module';
import { MortgageReportModule } from './mortgage-report/mortgage-report.module';
import { MortgageIndividualModule } from './mortgage-individual/mortgage-individual.module';
import { MortgageBusinessModule } from './mortgage-business/mortgage-business.module';
import { EmbezzlementReport } from './embezzlement-report/embezzlement-report';
import { EmbezzlementBusiness } from './embezzlement-business/embezzlement-business';
import { EmbezzlementIndividual } from './embezzlement-individual/embezzlement-individual';
import { InvestmentReport } from './investment-report/investment-report';
import { InvestmentBusiness } from './investment-business/investment-business';
import { InvestmentIndividual } from './investment-individual/investment-individual';
import { MortgageReport } from './mortgage-report/mortgage-report';
import { MortgageBusiness } from './mortgage-business/mortgage-business';
import { MortgageIndividual } from './mortgage-individual/mortgage-individual';
import { EmbezzlementReportController } from './embezzlement-report/embezzlement-report.controller';
import { EmbezzlementBusinessController } from './embezzlement-business/embezzlement-business.controller';
import { EmbezzlementIndividualController } from './embezzlement-individual/embezzlement-individual.controller';
import { InvestmentReportController } from './investment-report/investment-report.controller';
import { InvestmentBusinessController } from './investment-business/investment-business.controller';
import { InvestmentIndividualController } from './investment-individual/investment-individual.controller';
import { MortgageReportController } from './mortgage-report/mortgage-report.controller';
import { MortgageBusinessController } from './mortgage-business/mortgage-business.controller';
import { MortgageIndividualController } from './mortgage-individual/mortgage-individual.controller';
import { EmbezzlementReportService } from './embezzlement-report/embezzlement-report.service';
import { EmbezzlementBusinessService } from './embezzlement-business/embezzlement-business.service';
import { EmbezzlementIndividualService } from './embezzlement-individual/embezzlement-individual.service';
import { InvestmentReportService } from './investment-report/investment-report.service';
import { InvestmentBusinessService } from './investment-business/investment-business.service';
import { InvestmentIndividualService } from './investment-individual/investment-individual.service';
import { MortgageReportService } from './mortgage-report/mortgage-report.service';
import { MortgageBusinessService } from './mortgage-business/mortgage-business.service';
import { MortgageIndividualService } from './mortgage-individual/mortgage-individual.service';
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
        InstitutionIndividual, EmbezzlementReport, EmbezzlementBusiness, 
        EmbezzlementIndividual, InvestmentReport, InvestmentBusiness, 
        InvestmentIndividual, MortgageReport, MortgageBusiness, 
        MortgageIndividual],
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
    EmbezzlementReportModule,
    EmbezzlementIndividualModule,
    EmbezzlementBusinessModule,
    InvestmentIndividualModule,
    InvestmentBusinessModule,
    InvestmentReportModule,
    MortgageReportModule,
    MortgageIndividualModule,
    MortgageBusinessModule,
  ],
  controllers: [AppController, UserController, ContactController, AddressController, 
                BusinessController, IndividualController, OtherReportController, 
                OtherIndividualController, OtherBusinessController, 
                LaunderingReportController, LaunderingBusinessController, 
                LaunderingIndividualController, InstitutionReportController, 
                InstitutionBusinessController, InstitutionIndividualController, 
                EmbezzlementReportController, EmbezzlementBusinessController, 
                EmbezzlementIndividualController, InvestmentReportController, 
                InvestmentBusinessController, InvestmentIndividualController, 
                MortgageReportController, MortgageBusinessController, 
                MortgageIndividualController],
  providers: [AppService, UserService, ContactService, AddressService, BusinessService, 
              IndividualService, OtherReportService, OtherIndividualService, 
              OtherBusinessService, LaunderingReportService, LaunderingBusinessService, 
              LaunderingIndividualService, InstitutionReportService, 
              InstitutionBusinessService, InstitutionIndividualService, 
              EmbezzlementReportService, EmbezzlementBusinessService, 
              EmbezzlementIndividualService, InvestmentReportService, 
              InvestmentBusinessService, InvestmentIndividualService, 
              MortgageReportService, MortgageBusinessService, 
              MortgageIndividualService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
