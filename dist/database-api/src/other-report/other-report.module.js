"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherReportModule = void 0;
const common_1 = require("@nestjs/common");
const other_report_service_1 = require("./other-report.service");
const other_report_controller_1 = require("./other-report.controller");
const typeorm_1 = require("@nestjs/typeorm");
const other_report_1 = require("./other-report");
let OtherReportModule = class OtherReportModule {
};
exports.OtherReportModule = OtherReportModule;
exports.OtherReportModule = OtherReportModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([other_report_1.OtherReport])],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [other_report_controller_1.OtherReportController],
        providers: [other_report_service_1.OtherReportService],
    })
], OtherReportModule);
//# sourceMappingURL=other-report.module.js.map