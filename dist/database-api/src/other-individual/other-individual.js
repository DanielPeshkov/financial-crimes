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
exports.OtherIndividual = void 0;
const class_validator_1 = require("class-validator");
const individual_1 = require("src/individual/individual");
const other_report_1 = require("src/other-report/other-report");
const typeorm_1 = require("typeorm");
let OtherIndividual = class OtherIndividual {
};
exports.OtherIndividual = OtherIndividual;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OtherIndividual.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OtherIndividual.prototype, "reportid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OtherIndividual.prototype, "individualid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => other_report_1.OtherReport, report => report.id),
    (0, typeorm_1.JoinColumn)({ 'name': 'reportid' }),
    __metadata("design:type", typeof (_a = typeof other_report_1.OtherReport !== "undefined" && other_report_1.OtherReport) === "function" ? _a : Object)
], OtherIndividual.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => individual_1.Individual, ind => ind.id),
    (0, typeorm_1.JoinColumn)({ 'name': 'individualid' }),
    __metadata("design:type", typeof (_b = typeof individual_1.Individual !== "undefined" && individual_1.Individual) === "function" ? _b : Object)
], OtherIndividual.prototype, "individual", void 0);
exports.OtherIndividual = OtherIndividual = __decorate([
    (0, typeorm_1.Entity)()
], OtherIndividual);
//# sourceMappingURL=other-individual.js.map