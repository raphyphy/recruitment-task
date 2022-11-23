import { Request, Response, NextFunction } from 'express'

import db from "../../db";
import { CustomError } from "../../utils/response/CustomError";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const by : string | any = req.query?.by || undefined
    const order : string | any = req.query?.order || undefined
    res.json({ appliances: db.all(by, order) });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of appliances.`);
    return next(customError);
  }
};