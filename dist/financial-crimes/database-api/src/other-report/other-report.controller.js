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
exports.OtherReportController = void 0;
const common_1 = require("@nestjs/common");
const other_report_service_1 = require("./other-report.service");
const microservices_1 = require("@nestjs/microservices");
let OtherReportController = class OtherReportController {
    constructor(otherReportService) {
        this.otherReportService = otherReportService;
    }
    create(report) {
        return this.otherReportService.create(report);
    }
    findAll(data) {
        return this.otherReportService.findAll();
    }
    findOne(id) {
        return this.otherReportService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.otherReportService.update(+id, body);
    }
    delete(id) {
        return this.otherReportService.remove(id);
    }
};
exports.OtherReportController = OtherReportController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/other/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OtherReportController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/other/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OtherReportController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/other/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OtherReportController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putother/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OtherReportController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deleteother/report' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OtherReportController.prototype, "delete", null);
exports.OtherReportController = OtherReportController = __decorate([
    (0, common_1.Controller)('other/report'),
    __metadata("design:paramtypes", [other_report_service_1.OtherReportService])
], OtherReportController);
//# sourceMappingURL=other-report.controller.js.map