"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionBusinessModule = void 0;
const common_1 = require("@nestjs/common");
const institution_business_service_1 = require("./institution-business.service");
const institution_business_controller_1 = require("./institution-business.controller");
const typeorm_1 = require("@nestjs/typeorm");
const institution_business_1 = require("./institution-business");
let InstitutionBusinessModule = class InstitutionBusinessModule {
};
exports.InstitutionBusinessModule = InstitutionBusinessModule;
exports.InstitutionBusinessModule = InstitutionBusinessModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([institution_business_1.InstitutionBusiness])],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [institution_business_controller_1.InstitutionBusinessController],
        providers: [institution_business_service_1.InstitutionBusinessService],
    })
], InstitutionBusinessModule);
//# sourceMappingURL=institution-business.module.js.map