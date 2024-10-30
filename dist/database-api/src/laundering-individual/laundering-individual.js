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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunderingIndividual = void 0;
const class_validator_1 = require("class-validator");
const individual_1 = require("src/individual/individual");
const laundering_report_1 = require("src/laundering-report/laundering-report");
const typeorm_1 = require("typeorm");
let LaunderingIndividual = class LaunderingIndividual {
};
exports.LaunderingIndividual = LaunderingIndividual;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], LaunderingIndividual.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LaunderingIndividual.prototype, "reportid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LaunderingIndividual.prototype, "individualid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => laundering_report_1.LaunderingReport, report => report.id),
    (0, typeorm_1.JoinColumn)({ 'name': 'reportid' }),
    __metadata("design:type", typeof (_a = typeof laundering_report_1.LaunderingReport !== "undefined" && laundering_report_1.LaunderingReport) === "function" ? _a : Object)
], LaunderingIndividual.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => individual_1.Individual, ind => ind.id),
    (0, typeorm_1.JoinColumn)({ 'name': 'individualid' }),
    __metadata("design:type", typeof (_b = typeof individual_1.Individual !== "undefined" && individual_1.Individual) === "function" ? _b : Object)
], LaunderingIndividual.prototype, "individual", void 0);
exports.LaunderingIndividual = LaunderingIndividual = __decorate([
    (0, typeorm_1.Entity)()
], LaunderingIndividual);
//# sourceMappingURL=laundering-individual.js.map