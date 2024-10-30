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
exports.OtherIndividualController = void 0;
const common_1 = require("@nestjs/common");
const other_individual_service_1 = require("./other-individual.service");
const microservices_1 = require("@nestjs/microservices");
let OtherIndividualController = class OtherIndividualController {
    constructor(otherIndividualService) {
        this.otherIndividualService = otherIndividualService;
    }
    create(individual) {
        return this.otherIndividualService.create(individual);
    }
    findAll(data) {
        return this.otherIndividualService.findAll();
    }
    findOne(id) {
        return this.otherIndividualService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.otherIndividualService.update(+id, body);
    }
    delete(id) {
        return this.otherIndividualService.remove(id);
    }
};
exports.OtherIndividualController = OtherIndividualController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/other/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OtherIndividualController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/other/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OtherIndividualController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/other/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OtherIndividualController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putother/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OtherIndividualController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deleteother/individual' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OtherIndividualController.prototype, "delete", null);
exports.OtherIndividualController = OtherIndividualController = __decorate([
    (0, common_1.Controller)('other/individual'),
    __metadata("design:paramtypes", [other_individual_service_1.OtherIndividualService])
], OtherIndividualController);
//# sourceMappingURL=other-individual.controller.js.map