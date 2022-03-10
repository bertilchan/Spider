import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from '../decorator';
import { getResponseData } from '../utils/util';
import Crowller from '../utils/crowller';
import Analyzer from '../utils/analyzer';


const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : false);
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData<resopnseResult.isLogin>(false, '请先登录'));
  }
};

@controller('/api')
export class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: Request, res: Response): void {
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    res.json(getResponseData<resopnseResult.getData>(true));
  }

  @get('/showData')
  @use(checkLogin)
  showData(req: Request, res: Response): void {
    try {
      const position = path.resolve(__dirname, '../../data/course.json');
      const result = fs.readFileSync(position, 'utf8');
      res.json(getResponseData<resopnseResult.showData>(JSON.parse(result)));
    } catch (e) {
      res.json(getResponseData<resopnseResult.showData>(false, '数据不存在'));
    }
  }
}
