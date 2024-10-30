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
exports.LaunderingReportController = void 0;
const common_1 = require("@nestjs/common");
const laundering_report_service_1 = require("./laundering-report.service");
const microservices_1 = require("@nestjs/microservices");
let LaunderingReportController = class LaunderingReportController {
    constructor(launderingReportService) {
        this.launderingReportService = launderingReportService;
    }
    create(report) {
        return this.launderingReportService.create(report);
    }
    findAll(data) {
        return this.launderingReportService.findAll();
    }
    findOne(id) {
        return this.launderingReportService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.launderingReportService.update(+id, body);
    }
    delete(id) {
        return this.launderingReportService.remove(id);
    }
};
exports.LaunderingReportController = LaunderingReportController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/laundering/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LaunderingReportController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/laundering/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LaunderingReportController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/laundering/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LaunderingReportController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putlaundering/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LaunderingReportController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deletelaundering/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LaunderingReportController.prototype, "delete", null);
exports.LaunderingReportController = LaunderingReportController = __decorate([
    (0, common_1.Controller)('laundering/report'),
    __metadata("design:paramtypes", [laundering_report_service_1.LaunderingReportService])
], LaunderingReportController);
//# sourceMappingURL=laundering-report.controller.js.map