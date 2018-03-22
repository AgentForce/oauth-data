import { NextFunction, Request, Response, Router, json } from 'express';

import { apiErrorHandler } from '../handlers/errorHandler';
import { User } from '../models/User';
import * as Joi from 'joi';
var phoneValidator = require('joi-phone-validator');

export default class UserRoutes {

    constructor() { 
        
    }
    
    async postQueryUsers(req: Request, res: Response, next: NextFunction) {
        // console.log('vao')
        let result = {
            data: [],
            msg: "",
            pagenumber: req.params.page,
            pagesize: req.params.size,
            total: 0
        };
        try {
            let offset = 0;
            if( req.params.page > 1){
                offset = (req.params.page -1) * req.params.size ;
            }
            if(req.params.size < 0) offset = 20;
            let where: any;
            where = { phone : {
                $like: '%' + req.body.key + '%'
              }};
            if(req.body.type === "email")
                where = { email : {
                    $like: '%' + req.body.key + '%'
                  }};
            else if (req.body.type === "username")
                where = { username : {
                    $like: '%' + req.body.key + '%'
                  }};
            result["data"] = await User.findAll({ where: where , offset: offset, limit: req.params.size ,order: 'oauth_user."updatedAt"'})
                .then((result) => { return (result);  })
                .catch((err) => { throw (err);  // apiErrorHandler(err, req, res, "Fetch All Users failed."); 
            });
            result.total = await User.count({where: where})
                .then((result) => { return (result);  })
                .catch((err) => { throw (err);  // apiErrorHandler(err, req, res, "Fetch All Users failed."); 
            });            await res.json(result);
        } catch (error) {
            apiErrorHandler(error, req, res, "Get all User failed. ");
        }
        
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
            let offset = 0;
            if( req.params.page > 1){
                offset = (req.params.page -1) * req.params.size ;
            }
            if(req.params.size < 0) offset = 20;
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

    async createUser(req: Request, res: Response, next: NextFunction) {
        // console.log('create user');
        // Xử lý data 
        try {
            // console.log("Data post +++");
            let data_post = req['value']['body'];
            const user_report_to = req['value']['body'].report_to;
            let obj_report: any;
            let user_insert: any;
            data_post.report_to_list = "";
            data_post.report_to = "";
            data_post.report_to_username = "";
            // console.log(data_post);
            user_insert = await User.create(data_post)
                            .then((result) => { 
                                return (result); })
                            .catch((err) => { console.log(err); apiErrorHandler(err, req, res, "Creation of User failed." + JSON.stringify(err)); });
            //Select user_report_to
            obj_report = await User.findOne({where: { username: user_report_to }})
                                    .then((result) => {  return result; })
                                    .catch((err) => { throw err; });
            //Update user_report_to
            // console.log("obj_report +++++");
            // console.log(obj_report);

            let data_put: any;
            data_put = {
                report_to : obj_report.id,
                report_to_list: obj_report.report_to_list + "." + user_insert.id,
                report_to_username: obj_report.username
            }

            //Update report_to and report_to_list
            // console.log("data_put +++++");
            // console.log(data_put);
            
            user_insert = await User.update(data_put, { where: { username: user_insert.username } })
                .then((result) => { return (result); })
                .catch((err) => { throw err; });

            // console.log("user_insert +++++");
            // console.log(user_insert);
                
            await res.json(user_insert);
            // console.log("======");
           
                
            
        } catch (error) {
            console.log(error);
            apiErrorHandler(error, req, res, `Get of Role failed.`);
        }
        
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
