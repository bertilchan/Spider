"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/LoginController");
require("./controller/CrowllerController");
var router_1 = __importDefault(require("./router"));
var app = (0, express_1.default)();
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false })); // 不解析的话post请求中req.body就为undefined
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['teacher dell'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(router_1.default);
app.listen(7001, function () {
    console.log('服务已启动！');
});
