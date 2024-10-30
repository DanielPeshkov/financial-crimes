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
exports.BusinessController = void 0;
const common_1 = require("@nestjs/common");
const business_service_1 = require("./business.service");
const microservices_1 = require("@nestjs/microservices");
let BusinessController = class BusinessController {
    constructor(businessService) {
        this.businessService = businessService;
    }
    create(business) {
        return this.businessService.create(business);
    }
    findAll(data) {
        return this.businessService.findAll();
    }
    findOne(id) {
        return this.businessService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.businessService.update(+id, body);
    }
    delete(id) {
        return this.businessService.remove(id);
    }
};
exports.BusinessController = BusinessController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putbusiness' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deletebusiness' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "delete", null);
exports.BusinessController = BusinessController = __decorate([
    (0, common_1.Controller)('business'),
    __metadata("design:paramtypes", [business_service_1.BusinessService])
], BusinessController);
//# sourceMappingURL=business.controller.js.map