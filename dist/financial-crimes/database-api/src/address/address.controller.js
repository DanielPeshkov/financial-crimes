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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const address_service_1 = require("./address.service");
const microservices_1 = require("@nestjs/microservices");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    create(address) {
        return this.addressService.create(address);
    }
    findAll(data) {
        return this.addressService.findAll();
    }
    findOne(id) {
        return this.addressService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.addressService.update(+id, body);
    }
    delete(id) {
        return this.addressService.remove(id);
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/address' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/address' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/address' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putaddress' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deleteaddress' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "delete", null);
exports.AddressController = AddressController = __decorate([
    (0, common_1.Controller)('address'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
//# sourceMappingURL=address.controller.js.map