import { Request, Response, NextFunction, RequestHandler } from 'express'
import db from '../../db';
import { CustomError } from '../../utils';

export const update: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { name, type } = req.body;
  const { applianceId } = req.params

  try {
    const updateObj = db.upsert(Number(applianceId), { name, type })
    res.json({message: 'Successfully upserted an appliance.', ...updateObj})
  } catch (err: any) {
    const customError = new CustomError(400, 'Raw', `Can't update appliance: ${err}`);
    return next(customError);
  }
};