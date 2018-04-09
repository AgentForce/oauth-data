import { NextFunction, Request, Response, Router, json } from 'express';

import { apiErrorHandler } from '../handlers/errorHandler';
import { BaseApi } from "../handlers/api";
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
            result["data"] = await User.findAll({ offset: offset, limit: req.params.size ,order: [
                ['updatedAt', 'DESC'],
                ['id', 'ASC'],
            ]})
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

    async createUser(req: any, res: Response, next: NextFunction) {
        // Xử lý data 
        try {
            let data_post = req['value']['body'];
            const user_report_to = req['value']['body'].report_to;
            let obj_report: any;
            let user_insert: any;
            data_post.report_to_list = "";
            data_post.report_to = "";
            data_post.report_to_username = "";
            data_post.scope = "camp,post_lead,leader,camp_post,read,delete";
            user_insert = await User.create(data_post)
                            .then((result) => { 
                                return (result); })
                            .catch((err) => { console.log(err); apiErrorHandler(err, req, res, "Creation of User failed." + JSON.stringify(err)); });
            //Select user_report_to
            obj_report = await User.findOne({where: { username: user_report_to }})
                                    .then((result) => {  return result; })
                                    .catch((err) => { throw err; });
            //Update user_report_to
            let report_to_list = '';
            if(obj_report.report_to_list != ''){
                report_to_list = obj_report.report_to_list + ".";
            }
            let data_put: any;
            data_put = {
                report_to : obj_report.id,
                report_to_list:  report_to_list + user_insert.id,
                report_to_username: obj_report.username
            }

            //Update report_to and report_to_list
            // Call API Tú
            const api = new BaseApi();
            let res_api: any;
            const datapost = {
                "UserId" : user_insert.id,
                "ReportTo" : data_put.report_to,
                "ReportToList" : data_put.report_to_list
            }
            res_api = await api.apiPost(req.token, 'http://13.250.129.169:3001/api/users', JSON.stringify(datapost));
            console.log(res_api);
            //End call

            user_insert = await User.update(data_put, { where: { username: user_insert.username } })
                .then((result) => { return (result); })
                .catch((err) => { throw err; });

            await res.json(user_insert);
           
            
        } catch (error) {
            console.log(error);
            apiErrorHandler(error, req, res, `Get of Role failed.`);
        }
        
    }

    async createUsers(req: Request, res: Response, next: NextFunction){
        try {
            // username,phone,,,,,
            const arrUsers = req.body;
            const arrResUsers = [];
            for (let index = 0; index < arrUsers.length; index++) {
                const element = arrUsers[index];
                let obj = {
                    username: element.username.trim(),
                    phone: element.phone.trim(),
                    level: parseInt(element.level.trim()),
                    code_level: element.label.trim(),
                    fullName: element.fullname.trim(),
                    identity_card: element.cmnd.trim(),
                    report_to: element.reportto.trim(),
                    resource_ids: "SOP_API"
                    // role: "5ab1cfbb3a2e5604a5314fb5"
                }
                const user_support = new UserSupport();
                const resObj = await user_support.createUserObj(obj, req);
                arrResUsers[index] = resObj;
                console.log(resObj);
                // const element = await array[index];
                
            }
            
            await res.json(arrResUsers);
            /*User.bulkCreate(req.body).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
                res.json('không insert');
            }).then(users => {
                res.json(users); // ... in order to get the array of user objects
            }).catch((err) => { 
                //Insert từng dòng và ghi nhận lỗi
                
            });*/
        } catch (error) {
            console.log(error);
            console.log("+_++_++++___");
            apiErrorHandler(error, req, res, `Insert of Users failed.`);
        }
        
    }
    

    updateBadgeLevel(req: Request, res: Response, next: NextFunction) {
        try {
            const data_put = req.body;
            console.log(data_put);
            User.update(data_put, { where: { username: req.params.username } })
                .then((result) => { res.json(result); })
                .catch((err) => { throw err; });
        } catch (error) {
            console.log(error);
            apiErrorHandler(error, req, res, `updation Information User ${req.params.username}  failed.`); 
        }
        
    }

    updatePhoneUser(req: Request, res: Response, next: NextFunction) {
        
        const data_put = {status: 0, phone: req['value']['body'].phone};
        User.update(data_put, { where: { username: req.params.username } })
            .then((result) => { res.json(result); })
            .catch((err) => { console.log(err); apiErrorHandler(err, req, res, `updation of User ${req.params.username}  failed.`); });
    }

    updatePassUser(req: Request, res: Response, next: NextFunction) {
        
        const data_put = {password: req.body.password};
        User.update(data_put, { where: { username: req.params.username } })
            .then((result) => {
                const res_return = {
                    "success": true,
                    "result": result
                }
                if( result[0] < 1 ){
                    res_return.success = false;
                }
                res.json(res_return);
             })
            .catch((err) => { console.log(err); apiErrorHandler(err, req, res, `updation of User ${req.params.username}  failed.`); });
    }

    resetPassUser(req: Request, res: Response, next: NextFunction) {
        
        const data_put = {password: "uK8748", status: 0};
        User.update(data_put, { where: { username: req.params.username } })
            .then((result) => {
                const res_return = {
                    "success": true,
                    "result": result
                }
                if( result[0] < 1 ){
                    res_return.success = false;
                }
                res.json(res_return);
             })
            .catch((err) => { console.log(err); apiErrorHandler(err, req, res, `updation of User ${req.params.username}  failed.`); });
    }

    updateStatusOTPUser(req: Request, res: Response, next: NextFunction) {
        const data_put = {status: 1};
        User.update(data_put, { where: { username: req.params.username } })
            .then((result) => { 

                const res_return = {
                    "success": true,
                    "result": result
                }
                if( result[0] < 1 ){
                    res_return.success = false;
                }
                res.json(res_return)

            })
            .catch((err) => { console.log(err); apiErrorHandler(err, req, res, `updation of User ${req.params.id}  failed.`); });
    }

    updateDeactive (req: Request, res: Response, next: NextFunction){
        const data_put = {status: 2};
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
            .then((result: any) => {

                const res_return = {
                    "success": true,
                    "result": result
                }
                if( ! result ){
                    res_return.success = false;
                }
                res.json(res_return)
            })
            .catch((err) => { apiErrorHandler(err, req, res, `User ${req.params.id} not found.`); });
    }
}

export class UserSupport {

    constructor() { 
        
    }
    async createUserObj(data_post, req: any) {
        // console.log('create user');
        // Xử lý data 
        try {
            // console.log("Data post +++");
            const user_report_to = data_post.report_to;
            let obj_report: any;
            let user_insert: any;
            data_post.report_to_list = "";
            data_post.report_to = "";
            data_post.report_to_username = "";
            data_post.scope = "camp,post_lead,leader,camp_post,read,delete";

            // console.log(data_post);
            user_insert = await User.create(data_post)
                            .then((result) => { 
                                return (result); })
                            .catch((err) => { throw err; });
            //Select user_report_to
            obj_report = await User.findOne({where: { username: user_report_to }})
                                    .then((result) => {  return result; })
                                    .catch((err) => { throw err; });
            //Update user_report_to
            // console.log("obj_report +++++");
            // console.log(obj_report);
            let report_to_list = '';
            if(obj_report.report_to_list != ''){
                report_to_list = obj_report.report_to_list + ".";
            }
            let data_put: any;
            data_put = {
                report_to : obj_report.id,
                report_to_list:  report_to_list + user_insert.id,
                report_to_username: obj_report.username
            }

            // Call API Tú
            const api = new BaseApi();
            let res_api: any;
            const datapost = {
                "UserId" : user_insert.id,
                "ReportTo" : data_put.report_to,
                "ReportToList" : data_put.report_to_list
            }
            res_api = await api.apiPost(req.token, 'http://13.250.129.169:3001/api/users', JSON.stringify(datapost));
            console.log(res_api);
            //End call

            //Update report_to and report_to_list
            
            user_insert = await User.update(data_put, { where: { username: user_insert.username } })
                .then((result) => { return (result); })
                .catch((err) => { throw err; });

            // console.log("user_insert +++++");
            // console.log(user_insert);
            data_post.resultInsert = "Thành công";
            data_post.style = "white";
            console.log(data_post);
            return data_post
            // console.log("======");
        
                
            
        } catch (error) {
            console.log(error);
            data_post.resultInsert = "Thất bại";
            data_post.style = "red";
            return data_post;
        }
        
    }
}