"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contact_module_1 = require("./contact/contact.module");
const user_1 = require("./user/user");
const user_module_1 = require("./user/user.module");
const user_controller_1 = require("./user/user.controller");
const config_1 = require("@nestjs/config");
const user_service_1 = require("./user/user.service");
const contact_controller_1 = require("./contact/contact.controller");
const contact_service_1 = require("./contact/contact.service");
const contact_1 = require("./contact/contact");
const address_module_1 = require("./address/address.module");
const address_1 = require("./address/address");
const address_controller_1 = require("./address/address.controller");
const address_service_1 = require("./address/address.service");
const business_module_1 = require("./business/business.module");
const business_1 = require("./business/business");
const business_controller_1 = require("./business/business.controller");
const business_service_1 = require("./business/business.service");
const individual_module_1 = require("./individual/individual.module");
const individual_1 = require("./individual/individual");
const individual_controller_1 = require("./individual/individual.controller");
const individual_service_1 = require("./individual/individual.service");
const other_report_module_1 = require("./other-report/other-report.module");
const other_report_controller_1 = require("./other-report/other-report.controller");
const other_report_service_1 = require("./other-report/other-report.service");
const other_report_1 = require("./other-report/other-report");
const other_individual_module_1 = require("./other-individual/other-individual.module");
const other_individual_1 = require("./other-individual/other-individual");
const other_individual_controller_1 = require("./other-individual/other-individual.controller");
const other_individual_service_1 = require("./other-individual/other-individual.service");
const other_business_module_1 = require("./other-business/other-business.module");
const other_business_1 = require("./other-business/other-business");
const other_business_controller_1 = require("./other-business/other-business.controller");
const other_business_service_1 = require("./other-business/other-business.service");
const laundering_report_module_1 = require("./laundering-report/laundering-report.module");
const laundering_report_1 = require("./laundering-report/laundering-report");
const laundering_report_controller_1 = require("./laundering-report/laundering-report.controller");
const laundering_report_service_1 = require("./laundering-report/laundering-report.service");
const laundering_business_module_1 = require("./laundering-business/laundering-business.module");
const laundering_business_1 = require("./laundering-business/laundering-business");
const laundering_business_controller_1 = require("./laundering-business/laundering-business.controller");
const laundering_business_service_1 = require("./laundering-business/laundering-business.service");
const laundering_individual_module_1 = require("./laundering-individual/laundering-individual.module");
const laundering_individual_1 = require("./laundering-individual/laundering-individual");
const laundering_individual_service_1 = require("./laundering-individual/laundering-individual.service");
const laundering_individual_controller_1 = require("./laundering-individual/laundering-individual.controller");
const institution_report_module_1 = require("./institution-report/institution-report.module");
const institution_report_1 = require("./institution-report/institution-report");
const institution_report_controller_1 = require("./institution-report/institution-report.controller");
const institution_report_service_1 = require("./institution-report/institution-report.service");
const institution_business_module_1 = require("./institution-business/institution-business.module");
const institution_business_1 = require("./institution-business/institution-business");
const institution_business_controller_1 = require("./institution-business/institution-business.controller");
const institution_business_service_1 = require("./institution-business/institution-business.service");
const institution_individual_module_1 = require("./institution-individual/institution-individual.module");
const institution_individual_1 = require("./institution-individual/institution-individual");
const institution_individual_controller_1 = require("./institution-individual/institution-individual.controller");
const institution_individual_service_1 = require("./institution-individual/institution-individual.service");
config_1.ConfigModule.forRoot();
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: String(process.env['DB_HOST']),
                port: Number(process.env['DB_PORT']),
                username: String(process.env['DB_USER']),
                password: String(process.env['DB_PASSWORD']),
                database: String(process.env['DB_DATABASE']),
                entities: [user_1.User, contact_1.Contact, address_1.Address, business_1.Business, individual_1.Individual, other_report_1.OtherReport,
                    other_individual_1.OtherIndividual, other_business_1.OtherBusiness, laundering_report_1.LaunderingReport, laundering_business_1.LaunderingBusiness,
                    laundering_individual_1.LaunderingIndividual, institution_report_1.InstitutionReport, institution_business_1.InstitutionBusiness,
                    institution_individual_1.InstitutionIndividual],
                synchronize: false,
            }),
            user_module_1.UserModule,
            contact_module_1.ContactModule,
            address_module_1.AddressModule,
            business_module_1.BusinessModule,
            individual_module_1.IndividualModule,
            other_report_module_1.OtherReportModule,
            other_individual_module_1.OtherIndividualModule,
            other_business_module_1.OtherBusinessModule,
            laundering_report_module_1.LaunderingReportModule,
            laundering_business_module_1.LaunderingBusinessModule,
            laundering_individual_module_1.LaunderingIndividualModule,
            institution_report_module_1.InstitutionReportModule,
            institution_business_module_1.InstitutionBusinessModule,
            institution_individual_module_1.InstitutionIndividualModule,
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, contact_controller_1.ContactController, address_controller_1.AddressController,
            business_controller_1.BusinessController, individual_controller_1.IndividualController, other_report_controller_1.OtherReportController,
            other_individual_controller_1.OtherIndividualController, other_business_controller_1.OtherBusinessController,
            laundering_report_controller_1.LaunderingReportController, laundering_business_controller_1.LaunderingBusinessController,
            laundering_individual_controller_1.LaunderingIndividualController, institution_report_controller_1.InstitutionReportController,
            institution_business_controller_1.InstitutionBusinessController, institution_individual_controller_1.InstitutionIndividualController],
        providers: [app_service_1.AppService, user_service_1.UserService, contact_service_1.ContactService, address_service_1.AddressService, business_service_1.BusinessService,
            individual_service_1.IndividualService, other_report_service_1.OtherReportService, other_individual_service_1.OtherIndividualService,
            other_business_service_1.OtherBusinessService, laundering_report_service_1.LaunderingReportService, laundering_business_service_1.LaunderingBusinessService,
            laundering_individual_service_1.LaunderingIndividualService, institution_report_service_1.InstitutionReportService,
            institution_business_service_1.InstitutionBusinessService, institution_individual_service_1.InstitutionIndividualService],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], AppModule);
//# sourceMappingURL=app.module.js.map