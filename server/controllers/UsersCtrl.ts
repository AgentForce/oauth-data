import { NextFunction, Request, Response, Router, json } from 'express';

import { apiErrorHandler } from '../handlers/errorHandler';
import { BaseApi } from "../handlers/api";
import { User } from '../models/User';
import * as Joi from 'joi';
import { sequelize } from "./../db/db";
import * as lodash from "lodash";

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
    async getDashboard(req: any, res: Response, next: NextFunction) {
        let resQ: any;
        // resQ = await sequelize.query("select * from oauth_users where '56' @> report_to_list ",
        resQ = await sequelize.query("select * from oauth_users where report_to = '' ",
        { replacements: { }, type: sequelize.QueryTypes.SELECT }
        ).then(projects => {
            return projects;
        })
        // Count status sum
        let countSum: Number;
        countSum = await User.count({where: { resource_ids: "SOP_API" }})
                                    .then((result) => {  return result; })
                                    .catch((err) => { throw err; });

        let countSumActive: Number;
        countSumActive = await User.count({where: { resource_ids: "SOP_API", status: 1 }})
                                    .then((result) => {  return result; })
                                    .catch((err) => { throw err; });
        const countMonth = await sequelize.query("select * from oauth_users where resource_ids = 'SOP_API' and "+  '"createdAt"' + " LIKE '2018-04%'",
        { replacements: { }, type: sequelize.QueryTypes.SELECT }
        ).then(projects => {
            return projects.length;
        })

        const countActiveMonth = await sequelize.query("select * from oauth_users where resource_ids = 'SOP_API' and status = 1 and "+  '"createdAt"' + " LIKE '2018-04%'",
        { replacements: { }, type: sequelize.QueryTypes.SELECT }
        ).then(projects => {
            return projects.length;
        })
        
        // console.log(countSum);
        // console.log(countSumActive);
        // console.log(countActiveMonth);
        // const abc = await lodash.groupBy(resQ, "report_to");
        // let arr = await lodash.values(abc);
        // arr = await lodash.orderBy(arr, 'report_to_list', 'asc');
        /*for (let index = arr.length - 1 ; index >= 0; index--) {
            const element = arr[index];
            // console.log(element);
            const index_find = lodash.findIndex(resQ, function(o: any) { return o.report_to == element[0].report_to; });
            if(index_find >= 0){
                resQ[index_find].child = JSON.stringify(arr[index]);
            }

        }
        console.log(resQ)
        console.log("=======")
        const abc2 = await lodash.groupBy(resQ, "report_to");
        let arr2 = await lodash.values(abc2);
        arr2 = await lodash.orderBy(arr2, 'report_to_list', 'asc');
        console.log("===eeeee====")*/
        const data = {
            resQ : resQ,
            countSum: countSum,
            countSumActive: countSumActive,
            countMonth: countMonth,
            countActiveMonth: countActiveMonth
        }
        await res.json(data);

    }
    async getReportToID(req: any, res: Response, next: NextFunction) {
        let resQ: any;
        resQ = await sequelize.query("select * from oauth_users where report_to = '" + req.params.id + "'",
        { replacements: { }, type: sequelize.QueryTypes.SELECT }
        ).then(projects => {
            return projects;
        })
        await res.json(resQ);

    }
    async createUser(req: any, res: Response, next: NextFunction) {
        // Xử lý data 
        try {
            let data_post = req.body;
            const user_report_to = req.body.report_to;
            let obj_report: any;
            let user_insert: any;
            data_post.report_to_list = "";
            data_post.report_to = "";
            data_post.report_to_username = "";
            // data_post.scope = "camp,post_lead,leader,camp_post,read,delete";
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
                report_to_username: obj_report.fullName + " - " + obj_report.username 
            }

            //Update report_to and report_to_list
            // Call API Tú
            const api = new BaseApi();
            let res_api: any;
            const datapost = {
                "UserId" : user_insert.id,
                "FullName": user_insert.fullName,
                "LevelCode" : parseInt(user_insert.level),
                "ReportTo" : data_put.report_to,
                "ReportToList" : data_put.report_to_list
            }
            res_api = await api.apiPost(req.token, 'http://13.250.129.169:3001/api/users', JSON.stringify(datapost));
            // console.log(res_api);
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
                    username: element.user_name.trim(),
                    phone: element.phone.trim(),
                    level: parseInt(element.level.trim()),
                    code_level: element.code_level.trim(),
                    fullName: element.full_name.trim(),
                    identity_card: element.cmnd.trim(),
                    report_to: element.report_to.trim(),
                    resource_ids: "SOP_API",
                    scope: element.roles.trim(),
                    zone: element.zone.trim(),
                    badge: element.badge.trim(),
                    expirence: element.expirence.trim(),
                    onboard_date: element.onboard_date.trim(),
                    manager_badge: element.manager_badge.trim()
                }
                const user_support = new UserSupport();
                const resObj = await user_support.createUserObj(obj, req);
                arrResUsers[index] = resObj;
                // console.log(resObj);
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
            // console.log(data_put);
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

    async changeReportTo(req: any, res: Response, next: NextFunction) {
        
        const data_put = req.body;
        // console.log(data_put);
        // data_put.des = "mum3";
        // data_put.src = "test2504";
        let obj_des: any;
        obj_des = await User.findOne({where: { username: data_put.des }})
                                    .then((result) => {  return result; })
                                    .catch((err) => { throw err; });
        let obj_src: any;
        obj_src = await User.findOne({where: { username: data_put.src }})
                                    .then((result) => {  return result; })
                                    .catch((err) => { throw err; });

        let resQ: any;
        // resQ = await sequelize.query("select * from oauth_users where '56' @> report_to_list ",
        // update tree set path = DESTINATION_PATH || subpath(path, nlevel(SOURCE_PATH)-1) where path <@ SOURCE_PATH;
        // resQ = await sequelize.query("update oauth_users set report_to_list = '56.810' || subpath(report_to_list, nlevel('56.809.813')-1) where report_to_list <@ '56.809.813'",
        resQ = await sequelize.query("update oauth_users set report_to_list = '" + obj_des.report_to_list + "' || subpath(report_to_list, nlevel('" + obj_src.report_to_list + "')-1) where report_to_list <@ '" + obj_src.report_to_list + "'",
        { replacements: { }, type: sequelize.QueryTypes.UPDATE }
        ).then(projects => {
            // console.log(projects);
            sequelize.query("update oauth_users set report_to = '" + obj_des.id + "', report_to_username = '" + obj_des.fullName + " - " + obj_des.username  + "' where id = '" + obj_src.id + "'",
            { replacements: { }, type: sequelize.QueryTypes.UPDATE }
            ).then(projects => {
                // Call API Tú
                const api = new BaseApi();
                let res_api: any;
                const datapost = {
                    "UserIdDes" : obj_des.id,
                    "UserIdSrc": obj_src.id,
                    "IsMoveAll" : true
                }
                // console.log(datapost);
                res_api =  api.apiPut(req.token, 'http://13.250.129.169:3001/api/users/moveuser', JSON.stringify(datapost));
                // console.log(res_api);
                //End call

                res.json(res_api);
                
            })
            
        })
        
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
            // data_post.scope = "camp,post_lead,leader,camp_post,read,delete";

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
                report_to_username: obj_report.fullName + " - " + obj_report.username 
            }

            // Call API Tú
            const api = new BaseApi();
            let res_api: any;
            const datapost = {
                "UserId" : user_insert.id,
                "FullName": user_insert.fullName,
                "LevelCode" : parseInt(user_insert.level),
                "ReportTo" : data_put.report_to,
                "ReportToList" : data_put.report_to_list
            }
            res_api = await api.apiPost(req.token, 'http://13.250.129.169:3001/api/users', JSON.stringify(datapost));
            // console.log(res_api);
            //End call

            //Update report_to and report_to_list
            
            user_insert = await User.update(data_put, { where: { username: user_insert.username } })
                .then((result) => { return (result); })
                .catch((err) => { throw err; });

            // console.log("user_insert +++++");
            // console.log(user_insert);
            data_post.resultInsert = "Thành công";
            data_post.style = "white";
            // console.log(data_post);
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