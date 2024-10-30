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
exports.LaunderingIndividualController = void 0;
const common_1 = require("@nestjs/common");
const laundering_individual_service_1 = require("./laundering-individual.service");
const microservices_1 = require("@nestjs/microservices");
let LaunderingIndividualController = class LaunderingIndividualController {
    constructor(launderingIndividualService) {
        this.launderingIndividualService = launderingIndividualService;
    }
    create(individual) {
        return this.launderingIndividualService.create(individual);
    }
    findAll(data) {
        return this.launderingIndividualService.findAll();
    }
    findOne(id) {
        return this.launderingIndividualService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.launderingIndividualService.update(+id, body);
    }
    delete(id) {
        return this.launderingIndividualService.remove(id);
    }
};
exports.LaunderingIndividualController = LaunderingIndividualController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/laundering/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LaunderingIndividualController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/laundering/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LaunderingIndividualController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/laundering/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LaunderingIndividualController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putlaundering/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LaunderingIndividualController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deletelaundering/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LaunderingIndividualController.prototype, "delete", null);
exports.LaunderingIndividualController = LaunderingIndividualController = __decorate([
    (0, common_1.Controller)('laundering/individual'),
    __metadata("design:paramtypes", [laundering_individual_service_1.LaunderingIndividualService])
], LaunderingIndividualController);
//# sourceMappingURL=laundering-individual.controller.js.map