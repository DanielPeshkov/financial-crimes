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
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const contact_service_1 = require("./contact.service");
const microservices_1 = require("@nestjs/microservices");
let ContactController = class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    create(contact) {
        return this.contactService.create(contact);
    }
    findAll(data) {
        return this.contactService.findAll();
    }
    findOne(id) {
        return this.contactService.findOne(id);
    }
    update(payload) {
        let { id, body } = payload;
        return this.contactService.update(+id, body);
    }
    delete(id) {
        return this.contactService.remove(id);
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'post/contact' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'get/contact' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'getById/contact' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'putcontact' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ path: 'deletecontact' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "delete", null);
exports.ContactController = ContactController = __decorate([
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map