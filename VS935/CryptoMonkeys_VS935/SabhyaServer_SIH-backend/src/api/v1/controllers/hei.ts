import { InstituteModel } from '../models/institute';
import { ResourceModel } from '../models/resource';
import { Request, Response } from 'express';
import { filterAndSortFun } from '../services/filterAndSort';
import axios from 'axios';
import authMiddleWare from '../middlewares/auth';
// import py from "../../../../ML/"
import path from 'path';
import { spawn } from 'child_process';

// import py from ""
class Hei {
    //post
    async addNewContent(req: Request, res: Response) {
        try {
            const { data } = req.body;
            const { desc } = data;
            const keywords = await axios.post(`${process.env.ML_PORT}/keywords_extraction`, {
                desc
            });

            console.log(keywords.data);
            const response = await ResourceModel.create({
                intiId: req.institute._id,
                keyWords: keywords.data,
                ...data
            });

            res.status(201).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async filter(req: Request, res: Response) {
        try {
            const { filter } = req.body;
            const response = await filterAndSortFun(filter);
            res.status(200).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

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
    async myContents(req: Request, res: Response) {
        try {
            const { _id } = req.institute;
            const response = await ResourceModel.find({ intiId: _id }).populate('intiId');

            res.status(200).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async myOneInstiContent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const response = await ResourceModel.find({ intiId: id }).populate('intiId');

            res.status(200).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async mySubscribedContents(req: Request, res: Response) {
        try {
            const { _id } = req.institute;
            const response = await InstituteModel.findById({ _id: _id }).populate('subscriptionContent');
            // console.log(response)
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
            const { _id } = req.institute;
            const response = await InstituteModel.findById({ _id: _id }).populate('subscriptionInsti');
            console.log(response);
            res.status(200).json(response?.subscriptionInsti);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async mySubscriberInstitute(req: Request, res: Response) {
        try {
            const { _id } = req.institute;
            const response = await InstituteModel.findById({ _id: _id }).populate('subscriberInsti');
            res.status(200).json(response?.subscriberInsti);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async mySubscriberUser(req: Request, res: Response) {
        try {
            const { _id } = req.institute;
            const response = await InstituteModel.findById({ _id: _id }).populate('subscriberUser');
            console.log(response, 'response');
            res.status(200).json(response?.subscriberUser);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    async oneContent(req: Request, res: Response) {
        try {
            let { id } = req.params;
            const response = await ResourceModel.findOne({ _id: id }).populate('intiId');
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
            let { _id } = req.institute;
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
            let { _id } = req.institute;
            const response = await InstituteModel.findById({ _id });
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
            const { _id } = req.institute;
            const { data } = req.body;
            const response = await InstituteModel.findOneAndUpdate(
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

    async editContent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { data } = req.body;
            const response = await ResourceModel.findOneAndUpdate(
                {
                    _id: id,
                    intiId: req.institute._id
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

    async subscribeContent(req: Request, res: Response) {
        try {
            const { _id } = req.institute;
            const { id } = req.body.data;

            const response1 = await InstituteModel.findOneAndUpdate(
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
                    $push: { subscriberInsti: _id }
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
            const { _id } = req.institute;
            const { id } = req.body.data;

            const response1 = await InstituteModel.findOneAndUpdate(
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
                    $push: { subscriberInsti: _id }
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

    async unsubscribe(req: Request, res: Response) {
        try {
            const { _id } = req.institute;
            const { intiId } = req.body;

            const res1 = await InstituteModel.findOneAndUpdate(
                {
                    _id
                },
                {
                    $pull: { subscribtion: intiId }
                },
                {
                    new: true
                }
            );

            let response: any = null;
            if (res1) {
                response = await InstituteModel.findOneAndUpdate(
                    {
                        intiId
                    },
                    {
                        $pull: { subscriber: _id }
                    },
                    {
                        new: true
                    }
                );
            }

            res.status(201).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }

    //delete
    async deleteContent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const response = await ResourceModel.findByIdAndDelete({
                _id: id,
                intiId: req.institute._id
            });
            res.status(202).json(response);
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }
            console.log(e, 'error');
        }
    }
}

export default Hei;
