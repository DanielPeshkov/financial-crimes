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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherReport = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const contact_1 = require("../contact/contact");
const other_business_1 = require("src/other-business/other-business");
const other_individual_1 = require("src/other-individual/other-individual");
let OtherReport = class OtherReport {
};
exports.OtherReport = OtherReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OtherReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OtherReport.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OtherReport.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OtherReport.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], OtherReport.prototype, "incidentdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OtherReport.prototype, "approx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OtherReport.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OtherReport.prototype, "documentation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OtherReport.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OtherReport.prototype, "contactid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OtherReport.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], OtherReport.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], OtherReport.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => contact_1.Contact, contact => contact.id),
    (0, typeorm_1.JoinColumn)({ 'name': 'contactid' }),
    __metadata("design:type", contact_1.Contact)
], OtherReport.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => other_business_1.OtherBusiness, bus => bus.report),
    __metadata("design:type", Array)
], OtherReport.prototype, "otherbusiness", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => other_individual_1.OtherIndividual, ind => ind.report),
    __metadata("design:type", Array)
], OtherReport.prototype, "otherindividual", void 0);
exports.OtherReport = OtherReport = __decorate([
    (0, typeorm_1.Entity)({ 'name': 'otherreport' })
], OtherReport);
//# sourceMappingURL=other-report.js.map