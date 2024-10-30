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
exports.LaunderingBusinessController = void 0;
const common_1 = require("@nestjs/common");
const laundering_business_service_1 = require("./laundering-business.service");
const microservices_1 = require("@nestjs/microservices");
let LaunderingBusinessController = class LaunderingBusinessController {
    constructor(launderingBusinessService) {
        this.launderingBusinessService = launderingBusinessService;
    }
    create(business) {
        return this.launderingBusinessService.create(business);
    }
    findAll(data) {
        return this.launderingBusinessService.findAll();
    }
    findOne(id) {
        return this.launderingBusinessService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.launderingBusinessService.update(+id, body);
    }
    delete(id) {
        return this.launderingBusinessService.remove(id);
    }
};
exports.LaunderingBusinessController = LaunderingBusinessController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/laundering/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LaunderingBusinessController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/laundering/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LaunderingBusinessController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/laundering/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LaunderingBusinessController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putlaundering/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LaunderingBusinessController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deletelaundering/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LaunderingBusinessController.prototype, "delete", null);
exports.LaunderingBusinessController = LaunderingBusinessController = __decorate([
    (0, common_1.Controller)('laundering/business'),
    __metadata("design:paramtypes", [laundering_business_service_1.LaunderingBusinessService])
], LaunderingBusinessController);
//# sourceMappingURL=laundering-business.controller.js.map