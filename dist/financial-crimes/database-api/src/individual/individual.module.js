"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndividualModule = void 0;
const common_1 = require("@nestjs/common");
const individual_service_1 = require("./individual.service");
const individual_controller_1 = require("./individual.controller");
const typeorm_1 = require("@nestjs/typeorm");
const individual_1 = require("./individual");
let IndividualModule = class IndividualModule {
};
exports.IndividualModule = IndividualModule;
exports.IndividualModule = IndividualModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([individual_1.Individual])],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [individual_controller_1.IndividualController],
        providers: [individual_service_1.IndividualService],
    })
], IndividualModule);
//# sourceMappingURL=individual.module.js.map