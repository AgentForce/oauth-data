import { NextFunction, Request, Response, Router, json } from 'express';

import { apiErrorHandler } from '../handlers/errorHandler';
import { User } from '../models/User';
import * as Joi from 'joi';
var phoneValidator = require('joi-phone-validator');

export default class UserRoutes {

    constructor() { 
        
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        console.log('vao')
        let result = {
            data: [],
            msg: "",
            pagenumber: req.params.page,
            pagesize: req.params.size,
            total: 0
        };
        try {
            let offset = (req.params.page -1) * req.params.size ;
            if(offset < 0) offset = 0;
            if(req.params.size < 0) offset = 20;
            console.log('hi')
            result["data"] = await User.findAll({ offset: offset, limit: req.params.size ,order: 'oauth_user."updatedAt"'})
                .then((result) => { return (result);  })
                .catch((err) => { throw (err);  // apiErrorHandler(err, req, res, "Fetch All Users failed."); 
            });
            result.total = await User.count({})
                .then((result) => { return (result);  })
                .catch((err) => { throw (err);  // apiErrorHandler(err, req, res, "Fetch All Users failed."); 
            });            await res.json(result);
        } catch (error) {
            apiErrorHandler(error, req, res, "Get all User failed. ");
        }
        
    }

    createUser(req: Request, res: Response, next: NextFunction) {
        console.log('create user');
        User.create(req['value']['body'])
            .then((result) => { res.json(result); })
            .catch((err) => { console.log(err); apiErrorHandler(err, req, res, "Creation of User failed." + JSON.stringify(err)); });
    }

    createUsers(req: Request, res: Response, next: NextFunction){
        try {
            User.bulkCreate(req.body).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
                res.json('không insert');
            }).then(users => {
                res.json(users); // ... in order to get the array of user objects
            }).catch((err) => { 
                //Insert từng dòng và ghi nhận lỗi
                
            });
        } catch (error) {
            apiErrorHandler(error, req, res, `Insert of Users failed.`);
        }
        
    }
    updateBadgeLevel(req: Request, res: Response, next: NextFunction) {
        try {
            const data_put = req['value']['body'];
            User.update(data_put, { where: { username: req.params.username } })
                .then((result) => { res.json(result); })
                .catch((err) => { throw err; });
        } catch (error) {
            apiErrorHandler(error, req, res, `updation of User ${req.params.id}  failed.`); 
        }
        
    }

    updatePhoneUser(req: Request, res: Response, next: NextFunction) {
        
        const data_put = {status: 0, phone: req['value']['body'].phone};
        User.update(data_put, { where: { username: req.params.username } })
            .then((result) => { res.json(result); })
            .catch((err) => { console.log(err); apiErrorHandler(err, req, res, `updation of User ${req.params.username}  failed.`); });
    }

    updateStatusOTPUser(req: Request, res: Response, next: NextFunction) {
        const data_put = {status: 1};
        User.update(data_put, { where: { username: req.params.username } })
            .then((result) => { res.json(result); })
            .catch((err) => { console.log(err); apiErrorHandler(err, req, res, `updation of User ${req.params.id}  failed.`); });
    }

    updateDeactive (req: Request, res: Response, next: NextFunction){
        const data_put = {status: -1};
        User.update(data_put, { where: { username: req.params.username } })
            .then((result) => { res.json(result); })
            .catch((err) => { console.log(err); apiErrorHandler(err, req, res, `Deactive ${req.params.username}  failed.`); });
    }
    
    updateActive(req: Request, res: Response, next: NextFunction) { // Login được nhưng phải send lại OTP
        
        const data_put = {status: 0, password: 'defaultkd'};
        User.update(data_put, { where: { username: req.params.username } })
            .then((result) => { res.json(result); })
            .catch((err) => { console.log(err); apiErrorHandler(err, req, res, `updation of User ${req.params.username}  failed.`); });
    }


    getUserById(req: Request, res: Response, next: NextFunction) {
        User.find({ where: { 'username': req.params.username } })
            .then((result) => res.json(result))
            .catch((err) => { apiErrorHandler(err, req, res, `User ${req.params.id} not found.`); });
    }
}
