"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkin_validation_1 = require("../validation/checkin-validation");
const database_1 = require("../application/database");
const validation_1 = require("../validation/validation");
const create = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, validation_1.validate)(checkin_validation_1.createCheckinValidation, request);
    return database_1.prismaClient.checkIn.create({
        data: user,
    });
});
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 5;
    const last_page = req.query.last_page;
    const status = req.query.status || "UKS";
    const statusCheckinArray = status.split(',');
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};
    const totalCount = yield database_1.prismaClient.checkIn.count({
        where: {
            status: {
                in: statusCheckinArray,
            },
        },
    });
    const totalPage = Math.ceil(totalCount / limit);
    const currentPage = page || 0;
    try {
        if (page < 0) {
            return res.status(400).json("Page value should not be negative");
        }
        else if (page === 1 && !last_page) {
            result.totalCount = totalCount;
            result.totalPage = totalPage;
            result.currentPage = currentPage;
            result.next = {
                page: page + 1,
                limit: limit,
            };
            result.data = yield database_1.prismaClient.checkIn.findMany({
                where: {
                    status: {
                        in: statusCheckinArray,
                    },
                },
                take: limit,
                skip: startIndex,
                orderBy: {
                    id: "desc",
                },
            });
            res.paginatedResult = result;
            result.currentCountPerPage = Object.keys(result.data).length;
            result.range = currentPage * limit;
            return result;
            //   return res.status(200).json(result);
        }
        else if (endIndex < totalCount && !last_page) {
            result.totalCount = totalCount;
            result.totalPage = totalPage;
            result.currentPage = currentPage;
            result.next = {
                page: page + 1,
                limit: limit,
            };
            result.data = yield database_1.prismaClient.checkIn.findMany({
                where: {
                    status: {
                        in: statusCheckinArray,
                    },
                },
                take: limit,
                skip: startIndex,
                orderBy: {
                    id: "desc",
                },
            });
            res.paginatedResult = result;
            result.currentCountPerPage = Object.keys(result.data).length;
            result.range = currentPage * limit;
            return result;
            //   return res.status(200).json(result);
        }
        else if (startIndex > 0 && !last_page) {
            result.totalCount = totalCount;
            result.totalPage = totalPage;
            result.currentPage = currentPage;
            result.previous = {
                page: page - 1,
                limit: limit,
            };
            result.data = yield database_1.prismaClient.checkIn.findMany({
                where: {
                    status: {
                        in: statusCheckinArray,
                    },
                },
                take: limit,
                skip: startIndex,
                orderBy: {
                    id: "desc",
                },
            });
            res.paginatedResult = result;
            result.currentCountPerPage = Object.keys(result.data).length;
            result.range = currentPage * limit;
            return result;
            //   return res.status(200).json(result);
        }
        else if (last_page === "true" && page === totalPage) {
            result.totalCount = totalCount;
            result.totalPage = totalPage;
            result.currentPage = totalPage;
            result.last = {
                page: totalPage,
                limit: limit,
            };
            result.data = yield database_1.prismaClient.checkIn.findMany({
                where: {
                    status: {
                        in: statusCheckinArray,
                    },
                },
                take: limit,
                skip: startIndex,
                orderBy: {
                    id: "desc",
                },
            });
            res.paginatedResult = result;
            result.currentCountPerPage = Object.keys(result.data).length;
            result.range = totalCount;
            return result;
            //   return res.status(200).json(result);
        }
        else {
            return res.status(404).json({ error: "Resource not found" });
        }
    }
    catch (err) {
        console.error("error", err);
        return res.status(500).json(err);
    }
    // return prismaClient.checkIn.findMany({
    //     select: {
    //         id: true,
    //         name: true,
    //         address: true,
    //         room: true,
    //         grade: true,
    //         complaint: true,
    //         status: true,
    //         created_at:true,
    //         return_at:true
    //     }
    // })
});
exports.default = {
    create,
    get
};
