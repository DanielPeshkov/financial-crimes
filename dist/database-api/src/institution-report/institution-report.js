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
exports.InstitutionReport = void 0;
const class_validator_1 = require("class-validator");
const contact_1 = require("src/contact/contact");
const institution_business_1 = require("src/institution-business/institution-business");
const institution_individual_1 = require("src/institution-individual/institution-individual");
const typeorm_1 = require("typeorm");
let InstitutionReport = class InstitutionReport {
};
exports.InstitutionReport = InstitutionReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], InstitutionReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InstitutionReport.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InstitutionReport.prototype, "institution", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], InstitutionReport.prototype, "incidentdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InstitutionReport.prototype, "approx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InstitutionReport.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InstitutionReport.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InstitutionReport.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InstitutionReport.prototype, "documentation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InstitutionReport.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InstitutionReport.prototype, "contactid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InstitutionReport.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], InstitutionReport.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], InstitutionReport.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => contact_1.Contact, contact => contact.id),
    (0, typeorm_1.JoinColumn)({ 'name': 'contactid' }),
    __metadata("design:type", typeof (_a = typeof contact_1.Contact !== "undefined" && contact_1.Contact) === "function" ? _a : Object)
], InstitutionReport.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => institution_business_1.InstitutionBusiness, bus => bus.report),
    __metadata("design:type", Array)
], InstitutionReport.prototype, "institutionbusiness", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => institution_individual_1.InstitutionIndividual, ind => ind.report),
    __metadata("design:type", Array)
], InstitutionReport.prototype, "institutionindividual", void 0);
exports.InstitutionReport = InstitutionReport = __decorate([
    (0, typeorm_1.Entity)({ 'name': 'institutionreport' })
], InstitutionReport);
//# sourceMappingURL=institution-report.js.map