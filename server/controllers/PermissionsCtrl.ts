import { NextFunction, Request, Response, Router, json } from 'express';

import { apiErrorHandler } from '../handlers/errorHandler';
import { Scope } from '../models/Scope';
import { RoleScope } from '../models/RoleScope';
import * as Joi from 'joi';
import { sequelize } from "./../db/db";
import * as _ from "lodash";

export default class RoleRoutes {

    constructor() { 
        
    }

    async getAllPermissions(req: Request, res: Response, next: NextFunction){
        Scope.findAll({  })
        .then((result) => {  res.json(result)})
        .catch((err) => { console.log(err);  apiErrorHandler(err, req, res, "Fetch All Scopes failed."); });
    }
    async getAllPermissionsPage(req: Request, res: Response, next: NextFunction) {
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
            resQ = await sequelize.query('SELECT public.oauth_scopes.id, public.oauth_scopes."scope", public.oauth_scopes."name", public.oauth_scopes.resource, public.oauth_role_scopes.role, public.oauth_role_scopes.name_role FROM public.oauth_scopes LEFT OUTER JOIN public.oauth_role_scopes ON (public.oauth_scopes.id = public.oauth_role_scopes.id_scope) ',
                { replacements: { }, type: sequelize.QueryTypes.SELECT }
            ).then(projects => {
                return projects;
            })
            let arrScope: any;
            arrScope = _.groupBy(resQ, "id");
            result.data = arrScope;
            result.total = await Scope.count({})
                .then((result) => { return (result);  })
                .catch((err) => { throw (err);  // apiErrorHandler(err, req, res, "Fetch All Users failed."); 
            });            
            await res.json(result);
        } catch (error) {
            console.log(error);
            apiErrorHandler(error, req, res, "Get all Scope failed. ");
        }

       
    }
    
    async postCreatePermissions(req: Request, res: Response, next: NextFunction) {
        try {
            Scope.create(req['value']['body'])
                .then((result) => { res.json(result); })
                .catch((err) => { console.log(err); apiErrorHandler(err, req, res, "Creation of Scope failed." + JSON.stringify(err)); });
    
        } catch (error) {
            console.log(error);
            apiErrorHandler(error, req, res, `Insert of Scope failed.`);
        }
    }

    async patchUpdatePermissions(req: Request, res: Response, next: NextFunction) {
        try {
            const data_put = req['body'];
            Scope.update(data_put, { where: { id: req.params.id } })
                .then((result) => { res.json(result); })
                .catch((err) => { console.log(err); apiErrorHandler(err, req, res, `updation of Scope ${req.params.username}  failed.`); });
    
        } catch (error) {
            apiErrorHandler(error, req, res, `Insert of Scope failed.`);
        }
    }

    async putLinkPermissions(req: Request, res: Response, next: NextFunction) {
        try {
            let arr_insert = [];
            await req.body.arrScope.forEach(element => {
                const obj = {id_role: req.params.id_role, id_scope: element.id, name_scope: element.name_scope, scope: element.scope};
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
            apiErrorHandler(error, req, res, `Insert of Scope Scope failed.`);
        }
    }

    async getObjPermissions(req: Request, res: Response, next: NextFunction) {
        try {
            Scope.findOne({where: { id: req.params.id }})
            .then((result) => {  res.json(result)})
            .catch((err) => { console.log(err);  apiErrorHandler(err, req, res, "Fetch All Scopes failed."); });
        } catch (error) {
            console.log(error);
            apiErrorHandler(error, req, res, `Get of Scope failed.`);
        }
    }

}
