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
exports.InstitutionReportController = void 0;
const common_1 = require("@nestjs/common");
const institution_report_service_1 = require("./institution-report.service");
const microservices_1 = require("@nestjs/microservices");
let InstitutionReportController = class InstitutionReportController {
    constructor(institutionReportService) {
        this.institutionReportService = institutionReportService;
    }
    create(report) {
        return this.institutionReportService.create(report);
    }
    findAll(data) {
        return this.institutionReportService.findAll();
    }
    findOne(id) {
        return this.institutionReportService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.institutionReportService.update(+id, body);
    }
    delete(id) {
        return this.institutionReportService.remove(id);
    }
};
exports.InstitutionReportController = InstitutionReportController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/institution/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstitutionReportController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/institution/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstitutionReportController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/institution/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InstitutionReportController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putinstitution/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstitutionReportController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deleteinstitution/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InstitutionReportController.prototype, "delete", null);
exports.InstitutionReportController = InstitutionReportController = __decorate([
    (0, common_1.Controller)('institution/report'),
    __metadata("design:paramtypes", [institution_report_service_1.InstitutionReportService])
], InstitutionReportController);
//# sourceMappingURL=institution-report.controller.js.map