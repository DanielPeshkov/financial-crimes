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
exports.OtherBusinessController = void 0;
const common_1 = require("@nestjs/common");
const other_business_service_1 = require("./other-business.service");
const microservices_1 = require("@nestjs/microservices");
let OtherBusinessController = class OtherBusinessController {
    constructor(otherBusinessService) {
        this.otherBusinessService = otherBusinessService;
    }
    create(business) {
        return this.otherBusinessService.create(business);
    }
    findAll(data) {
        return this.otherBusinessService.findAll();
    }
    findOne(id) {
        return this.otherBusinessService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.otherBusinessService.update(+id, body);
    }
    delete(id) {
        return this.otherBusinessService.remove(id);
    }
};
exports.OtherBusinessController = OtherBusinessController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/other/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OtherBusinessController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/other/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OtherBusinessController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/other/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OtherBusinessController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putother/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OtherBusinessController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deleteother/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OtherBusinessController.prototype, "delete", null);
exports.OtherBusinessController = OtherBusinessController = __decorate([
    (0, common_1.Controller)('other/business'),
    __metadata("design:paramtypes", [other_business_service_1.OtherBusinessService])
], OtherBusinessController);
//# sourceMappingURL=other-business.controller.js.map