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
exports.OtherBusiness = void 0;
const class_validator_1 = require("class-validator");
const business_1 = require("src/business/business");
const other_report_1 = require("src/other-report/other-report");
const typeorm_1 = require("typeorm");
let OtherBusiness = class OtherBusiness {
};
exports.OtherBusiness = OtherBusiness;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OtherBusiness.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OtherBusiness.prototype, "reportid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OtherBusiness.prototype, "businessid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => other_report_1.OtherReport, report => report.id),
    (0, typeorm_1.JoinColumn)({ 'name': 'reportid' }),
    __metadata("design:type", typeof (_a = typeof other_report_1.OtherReport !== "undefined" && other_report_1.OtherReport) === "function" ? _a : Object)
], OtherBusiness.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_1.Business, bus => bus.id),
    (0, typeorm_1.JoinColumn)({ 'name': 'businessid' }),
    __metadata("design:type", typeof (_b = typeof business_1.Business !== "undefined" && business_1.Business) === "function" ? _b : Object)
], OtherBusiness.prototype, "business", void 0);
exports.OtherBusiness = OtherBusiness = __decorate([
    (0, typeorm_1.Entity)()
], OtherBusiness);
//# sourceMappingURL=other-business.js.map