import { NextFunction, Request, Response, Router, json } from 'express';

import { apiErrorHandler } from '../handlers/errorHandler';
import { Role } from '../models/Role';
import { RoleScope } from '../models/RoleScope';
import * as Joi from 'joi';
import { sequelize } from "./../db/db";
import * as _ from "lodash";

export default class RoleRoutes {

    constructor() { 
        
    }

    async getAllRoles(req: Request, res: Response, next: NextFunction){
        Role.findAll({  })
        .then((result) => {  res.json(result)})
        .catch((err) => { console.log(err);  apiErrorHandler(err, req, res, "Fetch All Scopes failed."); });
    }
    async getAllRolesPage(req: Request, res: Response, next: NextFunction) {
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
            /*result["data"] = await Role.findAll({ offset: offset, limit: req.params.size ,order: 'oauth_role."updatedAt"'})
                .then((result) => { return (result);  })
                .catch((err) => { throw (err);  // apiErrorHandler(err, req, res, "Fetch All Users failed."); 
            });*/
            let resQ: any;
            resQ = await sequelize.query('SELECT public.oauth_roles.id, public.oauth_roles."role", public.oauth_roles."name", public.oauth_roles.resource, public.oauth_role_scopes.scope, public.oauth_role_scopes.name_scope FROM public.oauth_roles LEFT OUTER JOIN public.oauth_role_scopes ON (public.oauth_roles.id = public.oauth_role_scopes.id_role) ',
                { replacements: { }, type: sequelize.QueryTypes.SELECT }
            ).then(projects => {
                return projects;
            })
            let arrScope: any;
            arrScope = _.groupBy(resQ, "id");
            result.data = arrScope;
            result.total = await Role.count({})
                .then((result) => { return (result);  })
                .catch((err) => { throw (err);  // apiErrorHandler(err, req, res, "Fetch All Users failed."); 
            });            
            await res.json(result);
        } catch (error) {
            console.log(error);
            apiErrorHandler(error, req, res, "Get all Role failed. ");
        }

       
    }
    
    async postCreateRole(req: Request, res: Response, next: NextFunction) {
        try {
            Role.create(req['value']['body'])
                .then((result) => { res.json(result); })
                .catch((err) => { console.log(err); apiErrorHandler(err, req, res, "Creation of Role failed." + JSON.stringify(err)); });
    
        } catch (error) {
            console.log(error);
            apiErrorHandler(error, req, res, `Insert of Roles failed.`);
        }
    }

    async patchUpdateRole(req: Request, res: Response, next: NextFunction) {
        try {
            const data_put = req['body'];
            Role.update(data_put, { where: { id: req.params.id } })
                .then((result) => { res.json(result); })
                .catch((err) => { console.log(err); apiErrorHandler(err, req, res, `updation of User ${req.params.username}  failed.`); });
    
        } catch (error) {
            apiErrorHandler(error, req, res, `Insert of Users failed.`);
        }
    }

    async putLinkRoles(req: Request, res: Response, next: NextFunction) {
        try {
            let arr_insert = [];
            // console.log(req.body);
            await req.body.forEach(element => {
                const obj = {id_role: req.params.id_role, id_scope: element.id, name_scope: element.name_scope, scope: element.scope, name_role: element.name_role, role: element.role};
                arr_insert.push(obj);
            });

            await RoleScope.bulkCreate(arr_insert).then(rolescopes => {
                const res_return = {
                    Message: "Success",
                    data: rolescopes
                }
                res.json(rolescopes); // ... in order to get the array of user objects
            }).catch((err) => { 
                //Insert từng dòng và ghi nhận lỗi
                throw(err);
            });
        } catch (error) {
            console.log(error);
            apiErrorHandler(error, req, res, `Insert of Role Scope failed.`);
        }
    }

    async getObjRoles(req: Request, res: Response, next: NextFunction) {
        try {
            // console.log("getObjRoles");
            let role: any;
            role = await Role.findOne({where: { id: req.params.id }})
            .then((result) => {  return(result)})
            .catch((err) => { console.log(err);  apiErrorHandler(err, req, res, "Fetch All Scopes failed."); });
            let permissions: any;
            
            permissions = await RoleScope.findAll({where: { id_role: req.params.id }})
            .then((result) => {  return(result)})
            .catch((err) => { console.log(err);  apiErrorHandler(err, req, res, "Fetch All Scopes failed."); });
            
            const result = {
                role: role,
                permissions: permissions
            }
            // console.log(result);
            await res.json(result);
            // console.log("return kqqqqq");
        } catch (error) {
            console.log(error);
            apiErrorHandler(error, req, res, `Get of Role failed.`);
        }
    }

}
