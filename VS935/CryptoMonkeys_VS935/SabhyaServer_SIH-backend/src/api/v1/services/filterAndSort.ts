import mongoose from 'mongoose';

export const filterAndSortFun = async function (filter: any) {
    try {
        console.log(filter, 'filter');
        let aggregates = [];
        // console.log(filter.sortBy === 'relevance', 'true or false');

        //sorting
        if (filter.sortBy === 'popularity') {
            aggregates.push({ $sort: { review: -1, rating: -1 } });
        } else if (filter.sortBy === 'priceLH') {
            aggregates.push({ $sort: { price: 1 } });
        } else if (filter.sortBy === 'priceHL') {
            aggregates.push({ $sort: { price: -1 } });
        } else if (filter.sortBy === 'newest') {
            aggregates.push({ $sort: { createdAt: 1, review: 1, rating: 1 } });
        } else if (filter.sortBy === 'relevance') {
            aggregates.push({ $sort: { review: -1, rating: -1 } });
        }

        //filtering

        if (filter?.filterBy?.brand != undefined && filter?.filterBy?.brand?.length != 0) {
            aggregates.push({ $match: { feature: { $in: filter?.filterBy?.brand } } });
        }

        if (filter?.filterBy?.rating != undefined && filter?.filterBy?.rating?.length != 0) {
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
                    $or: filter?.filterBy?.rating.map((data: any) => {
                        return {
                            rating: {
                                $gte: parseInt(data)
                            }
                        };
                    })
                }
            });
        }

        if (filter?.filterBy?.offers != undefined && filter?.filterBy?.offers?.length != 0) {
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
                    $or: filter?.filterBy?.offers.map((data: any) => {
                        if (data == 9) {
                            return {
                                offer: {
                                    $lte: 10
                                }
                            };
                        } else {
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

        return mongoose.model('Resource').aggregate(aggregates);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

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
