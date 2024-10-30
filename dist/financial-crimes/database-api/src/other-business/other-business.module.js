"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherBusinessModule = void 0;
const common_1 = require("@nestjs/common");
const other_business_service_1 = require("./other-business.service");
const other_business_controller_1 = require("./other-business.controller");
const typeorm_1 = require("@nestjs/typeorm");
const other_business_1 = require("./other-business");
let OtherBusinessModule = class OtherBusinessModule {
};
exports.OtherBusinessModule = OtherBusinessModule;
exports.OtherBusinessModule = OtherBusinessModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([other_business_1.OtherBusiness])],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [other_business_controller_1.OtherBusinessController],
        providers: [other_business_service_1.OtherBusinessService],
    })
], OtherBusinessModule);
//# sourceMappingURL=other-business.module.js.map