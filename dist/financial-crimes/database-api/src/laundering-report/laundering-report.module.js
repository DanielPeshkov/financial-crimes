"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunderingReportModule = void 0;
const common_1 = require("@nestjs/common");
const laundering_report_service_1 = require("./laundering-report.service");
const laundering_report_controller_1 = require("./laundering-report.controller");
const typeorm_1 = require("@nestjs/typeorm");
const laundering_report_1 = require("./laundering-report");
let LaunderingReportModule = class LaunderingReportModule {
};
exports.LaunderingReportModule = LaunderingReportModule;
exports.LaunderingReportModule = LaunderingReportModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([laundering_report_1.LaunderingReport])],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [laundering_report_controller_1.LaunderingReportController],
        providers: [laundering_report_service_1.LaunderingReportService],
    })
], LaunderingReportModule);
//# sourceMappingURL=laundering-report.module.js.map