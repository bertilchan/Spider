"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var router_1 = __importDefault(require("../router"));
function controller(root) {
    return function (target) {
        for (var key in target.prototype) {
            var path = Reflect.getMetadata('path', target.prototype, key); // 路径
            var method = Reflect.getMetadata('method', target.prototype, key); // 请求类型
            var middleware = Reflect.getMetadata('middleware', target.prototype, key); // 中间件
            var handler = target.prototype[key]; // 路径所对应的函数
            if (path && method) {
                var fullPath = root === '/' ? path : "".concat(root).concat(path);
                if (middleware) {
                    router_1.default[method](fullPath, middleware, handler); // 绑定请求的路由和中间件
                }
                else {
                    router_1.default[method](fullPath, handler); // 绑定请求的路由
                }
            }
        }
    };
}
exports.controller = controller;
