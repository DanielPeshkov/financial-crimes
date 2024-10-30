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
exports.InstitutionBusinessController = void 0;
const common_1 = require("@nestjs/common");
const institution_business_service_1 = require("./institution-business.service");
const microservices_1 = require("@nestjs/microservices");
let InstitutionBusinessController = class InstitutionBusinessController {
    constructor(institutionBusinessService) {
        this.institutionBusinessService = institutionBusinessService;
    }
    create(business) {
        return this.institutionBusinessService.create(business);
    }
    findAll(data) {
        return this.institutionBusinessService.findAll();
    }
    findOne(id) {
        return this.institutionBusinessService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.institutionBusinessService.update(+id, body);
    }
    delete(id) {
        return this.institutionBusinessService.remove(id);
    }
};
exports.InstitutionBusinessController = InstitutionBusinessController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/institution/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstitutionBusinessController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/institution/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstitutionBusinessController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/institution/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InstitutionBusinessController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putinstitution/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstitutionBusinessController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deleteinstitution/business' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InstitutionBusinessController.prototype, "delete", null);
exports.InstitutionBusinessController = InstitutionBusinessController = __decorate([
    (0, common_1.Controller)('institution/business'),
    __metadata("design:paramtypes", [institution_business_service_1.InstitutionBusinessService])
], InstitutionBusinessController);
//# sourceMappingURL=institution-business.controller.js.map