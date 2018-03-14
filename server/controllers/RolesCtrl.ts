import { NextFunction, Request, Response, Router, json } from 'express';

import { apiErrorHandler } from '../handlers/errorHandler';
import { Role } from '../models/Role';
import * as Joi from 'joi';

export default class RoleRoutes {

    constructor() { 
        
    }

    
    getAllRoles(req: Request, res: Response, next: NextFunction) {
        Role.findAll({  })
            .then((result) => {  res.json(result)})
            .catch((err) => { console.log(err);  apiErrorHandler(err, req, res, "Fetch All Scopes failed."); });
    }
 
}
