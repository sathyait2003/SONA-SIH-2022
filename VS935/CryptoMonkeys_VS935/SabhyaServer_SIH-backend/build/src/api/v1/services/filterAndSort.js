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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterAndSortFun = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const filterAndSortFun = function (filter) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(filter, 'filter');
            let aggregates = [];
            // console.log(filter.sortBy === 'relevance', 'true or false');
            //sorting
            if (filter.sortBy === 'popularity') {
                aggregates.push({ $sort: { review: -1, rating: -1 } });
            }
            else if (filter.sortBy === 'priceLH') {
                aggregates.push({ $sort: { price: 1 } });
            }
            else if (filter.sortBy === 'priceHL') {
                aggregates.push({ $sort: { price: -1 } });
            }
            else if (filter.sortBy === 'newest') {
                aggregates.push({ $sort: { createdAt: 1, review: 1, rating: 1 } });
            }
            else if (filter.sortBy === 'relevance') {
                aggregates.push({ $sort: { review: -1, rating: -1 } });
            }
            //filtering
            if (((_a = filter === null || filter === void 0 ? void 0 : filter.filterBy) === null || _a === void 0 ? void 0 : _a.brand) != undefined && ((_c = (_b = filter === null || filter === void 0 ? void 0 : filter.filterBy) === null || _b === void 0 ? void 0 : _b.brand) === null || _c === void 0 ? void 0 : _c.length) != 0) {
                aggregates.push({ $match: { feature: { $in: (_d = filter === null || filter === void 0 ? void 0 : filter.filterBy) === null || _d === void 0 ? void 0 : _d.brand } } });
            }
            if (((_e = filter === null || filter === void 0 ? void 0 : filter.filterBy) === null || _e === void 0 ? void 0 : _e.rating) != undefined && ((_g = (_f = filter === null || filter === void 0 ? void 0 : filter.filterBy) === null || _f === void 0 ? void 0 : _f.rating) === null || _g === void 0 ? void 0 : _g.length) != 0) {
                // console.log(
                //     filter?.filterBy?.rating.map((data) => {
                //         return {
                //             rating: {
                //                 $gte: parseInt(data)
                //             }
                //         };
                //     })
                // );
                aggregates.push({
                    $match: {
                        $or: (_h = filter === null || filter === void 0 ? void 0 : filter.filterBy) === null || _h === void 0 ? void 0 : _h.rating.map((data) => {
                            return {
                                rating: {
                                    $gte: parseInt(data)
                                }
                            };
                        })
                    }
                });
            }
            if (((_j = filter === null || filter === void 0 ? void 0 : filter.filterBy) === null || _j === void 0 ? void 0 : _j.offers) != undefined && ((_l = (_k = filter === null || filter === void 0 ? void 0 : filter.filterBy) === null || _k === void 0 ? void 0 : _k.offers) === null || _l === void 0 ? void 0 : _l.length) != 0) {
                // console.log(
                //     filter?.filterBy?.offers.map((data) => {
                //         if (data == 9) {
                //             return {
                //                 offer: {
                //                     $lte: 10
                //                 }
                //             };
                //         } else {
                //             return {
                //                 offer: {
                //                     $gte: parseInt(data)
                //                 }
                //             };
                //         }
                //     })
                // );
                aggregates.push({
                    $match: {
                        $or: (_m = filter === null || filter === void 0 ? void 0 : filter.filterBy) === null || _m === void 0 ? void 0 : _m.offers.map((data) => {
                            if (data == 9) {
                                return {
                                    offer: {
                                        $lte: 10
                                    }
                                };
                            }
                            else {
                                return {
                                    offer: {
                                        $gte: parseInt(data)
                                    }
                                };
                            }
                        })
                    }
                });
            }
            aggregates.push({
                $facet: {
                    metadata: [{ $count: 'total' }, { $addFields: { page: filter.pageNo } }],
                    data: [{ $skip: 40 * (filter.pageNo - 1) }, { $limit: 40 }] // add projection here wish you re-shape the docs
                }
            });
            return mongoose_1.default.model('Resource').aggregate(aggregates);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
};
exports.filterAndSortFun = filterAndSortFun;
// if (filter.sortBy !== ApplicationConst.sortBy.relevance || !filter.desc || !filter.desc.length) {
//     aggregates.push({ $sort: { 'serviceObj.hourlyRate': 1 } });
// } else {
//     aggregates.push({
//         $addFields: {
//             relevance: {
//                 $size: { $setIntersection: [filter.desc, '$serviceObj.desc'] }
//             }
//         }
//     });
//     aggregates.push({ $match: { relevance: { $ne: 0 } } });
//     aggregates.push({ $sort: { relevance: -1 } });
// }
// if (mode === 'count') {
//     aggregates.push({ $count: 'count' });
// }
