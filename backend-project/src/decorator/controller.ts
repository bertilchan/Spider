import router from '../router';
import { RequestHandler } from 'express';
import { Methods } from './request';

export function controller(root: string) {
  return function(target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key);// 路径
      const method: Methods = Reflect.getMetadata('method', target.prototype, key);// 请求类型
      const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key);// 中间件
      const handler = target.prototype[key];// 路径所对应的函数
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`;
        if (middleware) {
          router[method](fullPath, middleware, handler);// 绑定请求的路由和中间件
        } else {
          router[method](fullPath, handler);// 绑定请求的路由
        }
      }
    }
  };
}
