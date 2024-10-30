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
exports.InstitutionIndividualController = void 0;
const common_1 = require("@nestjs/common");
const institution_individual_service_1 = require("./institution-individual.service");
const microservices_1 = require("@nestjs/microservices");
let InstitutionIndividualController = class InstitutionIndividualController {
    constructor(institutionIndividualService) {
        this.institutionIndividualService = institutionIndividualService;
    }
    create(individual) {
        return this.institutionIndividualService.create(individual);
    }
    findAll(data) {
        return this.institutionIndividualService.findAll();
    }
    findOne(id) {
        return this.institutionIndividualService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.institutionIndividualService.update(+id, body);
    }
    delete(id) {
        return this.institutionIndividualService.remove(id);
    }
};
exports.InstitutionIndividualController = InstitutionIndividualController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/institution/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstitutionIndividualController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/institution/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstitutionIndividualController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/institution/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InstitutionIndividualController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putinstitution/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstitutionIndividualController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deleteinstitution/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InstitutionIndividualController.prototype, "delete", null);
exports.InstitutionIndividualController = InstitutionIndividualController = __decorate([
    (0, common_1.Controller)('institution/individual'),
    __metadata("design:paramtypes", [institution_individual_service_1.InstitutionIndividualService])
], InstitutionIndividualController);
//# sourceMappingURL=institution-individual.controller.js.map