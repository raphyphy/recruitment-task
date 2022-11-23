import { Request, Response, NextFunction, RequestHandler } from 'express'

import db from "../../db";
import { Appliance } from '../../types/Appliance';
import { randomDate, CustomError } from '../../utils';

export const add: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id, name, type } : Appliance = req.body; // type checking does not exist at runtime so :Appliance does not do anything https://stackoverflow.com/questions/44078205/how-to-check-the-object-type-on-runtime-in-typescript
  // TODO: Add schema validation upon request (input validation middleware based on an interface/model)

  try {
    const createdAt = randomDate(new Date(2022, 0, 1), new Date(2022, 0, 30)); 
    const addObj = db.add({ id: Number(id), name, type, createdAt });
    res.json({ message: 'Successfully added an appliance.', ...addObj});
  } catch (err: any) {
    const customError = new CustomError(400, 'Raw', `Can't add appliance: ${err}`);
    return next(customError);
  }
};