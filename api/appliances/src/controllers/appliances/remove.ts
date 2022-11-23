import { Request, Response, NextFunction, RequestHandler } from 'express'
import db from '../../db';
import { CustomError } from '../../utils';

export const remove: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { applianceId } = req.params

  try {
    res.json({
      message: `Successfully removed ${db.remove(Number(applianceId)).removed} object/s.`
    })
  } catch (err: any) {
    const customError = new CustomError(400, 'Raw', `Can't update appliance: ${err}`);
    return next(customError);
  }
};