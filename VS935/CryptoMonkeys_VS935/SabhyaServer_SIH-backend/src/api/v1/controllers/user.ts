import { UserModel } from '../models/user';
import { InstituteModel } from '../models/institute';
import { ResourceModel } from '../models/resource';
import { Request, Response } from 'express';
import { filterAndSortFun } from '../services/filterAndSort';
import axios from 'axios';
import authMiddleWare from '../middlewares/auth';

class User {
    //post
    // async payments(req: Request, res: Response) {
    //     try {
    //         const { filter } = req.body;
    //         const response = await filterAndSortFun(filter);
    //         res.status(200).json(response);
    //     } catch (e) {
    //         if (e instanceof Error) {
    //             throw e;
    //         }
    //         console.log(e, 'error');
    //     }
    // }

    // get
    // async myContents(req: Request, res: Response) {
    //     try {
    //         const { _id } = req.user;
    //         let response1 = await UserModel.findById({ _id: _id }).populate('subscription');
    //         let response2 = await UserModel.findByIdAndUpdate(
    //             { _id: _id },
    //             {
    //                 docModel: response1.docModel == 'Institute' ? 'Resource' : 'Institute'
    //             },
    //             {
    //                 new: true
    //             }
    //         ).populate('subscription');

    //         const response = [...response1.subscription, ...response2.subscription];
    //         let result: any[] = [];

    //         res.status(200).json(response);
    //     } catch (e) {
    //         if (e instanceof Error) {
    //             throw e;
    //         }
    //         console.log(e, 'error');
    //     }
    // }

    async mySubscribedContents(req: Request, res: Response) {
        try {
            const { _id } = req.user;
            const response = await UserModel.findById({ _id: _id }).populate('subscriptionContent');
            res.status(200).json(response?.subscriptionContent);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async mySubscribedInstitute(req: Request, res: Response) {
        try {
            const { _id } = req.user;
            const response = await UserModel.findById({ _id: _id }).populate('subscriptionInsti');
            res.status(200).json(response?.subscriptionInsti);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    //use this in index route
    async contents(req: Request, res: Response) {
        try {
            //based on recommendation
            const response = await axios.get('http://localhost:8082/recommendedContents');
            res.status(200).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async recommendedContents(req: Request, res: Response) {
        try {
            //based on recommendation
            const response = await axios.get('http://localhost:8082/recommendedContents');
            res.status(200).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }
    //use this in index route

    async oneContent(req: Request, res: Response) {
        try {
            let { id } = req.params;
            const response = await ResourceModel.findOne({ _id: id });
            res.status(200).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async search(req: Request, res: Response) {
        try {
            let { _id } = req.user;
            const response = await ResourceModel.findById({ _id });
            res.status(200).json({ msg: 'not complete' });
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async profile(req: Request, res: Response) {
        try {
            let { _id } = req.user;
            const response = await UserModel.findById({ _id });
            res.status(200).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    // patch
    async editProfile(req: Request, res: Response) {
        try {
            const { _id } = req.user;
            const { data } = req.body;
            const response = await UserModel.findOneAndUpdate(
                {
                    _id
                },
                {
                    ...data
                },
                {
                    new: true
                }
            );

            res.status(201).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    // async subscribeContent(req: Request, res: Response) {
    //     try {
    //         const { _id } = req.user;
    //         const { id, subType } = req.body.data;

    //         const res1 = await UserModel.findOneAndUpdate(
    //             {
    //                 _id
    //             },
    //             {
    //                 $push: { subscription: id },
    //                 docModel: subType == 'content' ? 'Resource' : 'Institute'
    //             },
    //             {
    //                 new: true
    //             }
    //         );

    //         let response: any = null;

    //         if (res1) {
    //             if (subType == 'content') {
    //                 response = await ResourceModel.findOneAndUpdate(
    //                     {
    //                         _id: id
    //                     },
    //                     {
    //                         $push: { subscriber: _id }
    //                     },
    //                     {
    //                         new: true
    //                     }
    //                 );
    //             } else if (subType == 'institute') {
    //                 response = await InstituteModel.findOneAndUpdate(
    //                     {
    //                         _id: id
    //                     },
    //                     {
    //                         $push: { subscriber: _id }
    //                     },
    //                     {
    //                         new: true
    //                     }
    //                 );
    //             }
    //         }

    //         res.status(201).json(res1);
    //     } catch (e) {
    //         if (e instanceof Error) {
    //             throw e;
    //         }
    //         console.log(e, 'error');
    //     }
    // }

    async subscribeContent(req: Request, res: Response) {
        try {
            const { _id } = req.user;
            const { id } = req.body.data;

            const response1 = await UserModel.findOneAndUpdate(
                {
                    _id
                },
                {
                    $push: { subscriptionContent: id }
                },
                {
                    new: true
                }
            );

            let response = await ResourceModel.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $push: { subscriberUser: _id }
                },
                {
                    new: true
                }
            );

            res.status(201).json(response1);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async subscribeInsti(req: Request, res: Response) {
        try {
            const { _id } = req.user;
            const { id } = req.body.data;

            const response1 = await UserModel.findOneAndUpdate(
                {
                    _id
                },
                {
                    $push: { subscriptionInsti: id }
                },
                {
                    new: true
                }
            );

            const response2 = await InstituteModel.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $push: { subscriberUser: _id }
                },
                {
                    new: true
                }
            );

            res.status(201).json(response1);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    //not done in frontend
    // async unsubscribe(req: Request, res: Response) {
    //     try {
    //         const { _id } = req.user;
    //         const { intiId } = req.body;

    //         const res1 = await InstituteModel.findOneAndUpdate(
    //             {
    //                 _id
    //             },
    //             {
    //                 $pull: { subscribtion: intiId }
    //             },
    //             {
    //                 new: true
    //             }
    //         );

    //         let response: any = null;
    //         if (res1) {
    //             response = await InstituteModel.findOneAndUpdate(
    //                 {
    //                     intiId
    //                 },
    //                 {
    //                     $pull: { subscriber: _id }
    //                 },
    //                 {
    //                     new: true
    //                 }
    //             );
    //         }

    //         res.status(201).json(response);
    //     } catch (e) {
    //         if (e instanceof Error) {
    //             throw e;
    //         }
    //         console.log(e, 'error');
    //     }
    // }

    //delete
}

export default User;
