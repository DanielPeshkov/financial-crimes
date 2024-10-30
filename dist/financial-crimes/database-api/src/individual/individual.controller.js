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
exports.IndividualController = void 0;
const common_1 = require("@nestjs/common");
const individual_service_1 = require("./individual.service");
const microservices_1 = require("@nestjs/microservices");
let IndividualController = class IndividualController {
    constructor(individualService) {
        this.individualService = individualService;
    }
    create(individual) {
        return this.individualService.create(individual);
    }
    findAll(data) {
        return this.individualService.findAll();
    }
    findOne(id) {
        return this.individualService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.individualService.update(+id, body);
    }
    delete(id) {
        return this.individualService.remove(id);
    }
};
exports.IndividualController = IndividualController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IndividualController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IndividualController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IndividualController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putindividual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IndividualController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deleteindividual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IndividualController.prototype, "delete", null);
exports.IndividualController = IndividualController = __decorate([
    (0, common_1.Controller)('individual'),
    __metadata("design:paramtypes", [individual_service_1.IndividualService])
], IndividualController);
//# sourceMappingURL=individual.controller.js.map