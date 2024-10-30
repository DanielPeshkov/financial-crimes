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
exports.Individual = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const address_1 = require("../address/address");
const contact_1 = require("../contact/contact");
let Individual = class Individual {
};
exports.Individual = Individual;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Individual.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Individual.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Individual.prototype, "middlename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Individual.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Individual.prototype, "birth", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Individual.prototype, "approx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Individual.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Individual.prototype, "contactid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Individual.prototype, "addressid", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => contact_1.Contact, contact => contact.id),
    (0, typeorm_1.JoinColumn)({ 'name': 'contactid' }),
    __metadata("design:type", contact_1.Contact)
], Individual.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_1.Address, address => address.id),
    (0, typeorm_1.JoinColumn)({ 'name': 'addressid' }),
    __metadata("design:type", address_1.Address)
], Individual.prototype, "address", void 0);
exports.Individual = Individual = __decorate([
    (0, typeorm_1.Entity)()
], Individual);
//# sourceMappingURL=individual.js.map