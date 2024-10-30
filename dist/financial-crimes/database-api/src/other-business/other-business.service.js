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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherBusinessService = void 0;
const common_1 = require("@nestjs/common");
const other_business_1 = require("./other-business");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let OtherBusinessService = class OtherBusinessService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(otherBusiness) {
        return await this.repo.save(otherBusiness);
    }
    async findAll() {
        return await this.repo.find({
            relations: {
                report: {
                    contact: true,
                },
                business: {
                    contact: true,
                    address: true,
                },
            }
        });
    }
    async findOne(id) {
        return await this.repo.findOneOrFail({
            where: {
                id: id
            },
            relations: {
                report: {
                    contact: true,
                },
                business: {
                    contact: true,
                    address: true,
                },
            }
        }).catch(err => {
            throw new common_1.HttpException(`OtherBusiness with ID ${id} does not exist`, common_1.HttpStatus.NOT_FOUND);
        });
    }
    async update(id, data) {
        let otherBusiness = await this.repo.findOneBy({ id: id });
        if (!otherBusiness) {
            throw new common_1.HttpException(`OtherBusiness with ID ${id} does not exist`, common_1.HttpStatus.NOT_FOUND);
        }
        this.repo.merge(otherBusiness, data);
        await this.repo.update({ id: id }, otherBusiness).catch(err => {
            throw new common_1.HttpException(`Update otherBusiness ${id} failed: ${err}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        return await this.repo.findOne({
            where: {
                id: id
            },
            relations: {
                report: {
                    contact: true,
                },
                business: {
                    contact: true,
                    address: true,
                }
            }
        });
    }
    async remove(id) {
        return await this.repo.delete(id);
    }
};
exports.OtherBusinessService = OtherBusinessService;
exports.OtherBusinessService = OtherBusinessService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(other_business_1.OtherBusiness)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], OtherBusinessService);
//# sourceMappingURL=other-business.service.js.map