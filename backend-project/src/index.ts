import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session'
import './controller/LoginController';
import './controller/CrowllerController'
import router from './router'

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // 不解析的话post请求中req.body就为undefined
app.use(cookieSession({
  name: 'session',
  keys: ['teacher dell'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(router)

app.listen(7001, ()=>{
  console.log('服务已启动！');
})