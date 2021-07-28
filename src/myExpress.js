const http = require('http');
const slice = Array.prototype.slice

class myExpress {
    constructor() {
        //存放注册中间件的列表
        this.routes = {
            all : [],//use
            get : [],//get
            post : []//post
        }
    }

    //use, get, post 注册中间件的通用内部方法
    register (path) {
        const info = {};
        if(typeof path === 'string'){
            info.path = path;
            info.stack = slice.call(arguments, 1); //从第二个参数开始，转换为数组，存入stack
        }else{
            info.path = '/'; //类似使用use注册时第一个参数不是路由，默认为/
            info.stack = slice.call(arguments, 0); //从第一个参数开始，转换为数组，存入stack
        }
        return info;
    }

    use () {
        const info = this.register.apply(this, arguments);
        this.routes.all.push(info);
    }

    get () {
        const info = this.register.apply(this, arguments);
        this.routes.get.push(info);
    }

    post () {
        const info = this.register.apply(this, arguments);
        this.routes.post.push(info);
    }

    //匹配，筛选路由
    match(method, url){
        let stack = [];
        //监听到是获取图标，则默认返回空
        if (url === '/favicon.ico') {
            return stack
        }

        //首先获取所有routes
        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all);
        curRoutes = curRoutes.concat(this.routes[method]);
        //筛选路由，匹配监听的相应路由并放入stack中
        curRoutes.forEach(routeInfo => {
            if(url.indexOf(routeInfo.path) === 0){
                //匹配情况
                // url = '/api/getData' ===> routeInfo.path = '/'
                // url = '/api/getData' ===> routeInfo.path = '/api'
                // url = '/api/getData' ===> routeInfo.path = '/api/getData'
                stack = stack.concat(routeInfo.stack)
            }
        })
        return stack;
    }

    //核心的next机制
    handle(req, res, stack){
        const next = () => {
            const middleware = stack.shift()
            if(middleware){
                middleware(req, res, next)
            }
        }
        next();
    }

    callback (){
        return (req, res) => {
            //设置以下返回的格式，因为原生没有
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url;
            const method = req.method.toLowerCase()
            //匹配路由
            const resultList = this.match(method, url)
            this.handle(req, res, resultList)
        }
    }

    listen (...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = () => {
    return new myExpress
}

//测试
// const express = require('./myExpress')

// const app = express()

// app.use((req, res, next) => {
//     console.log('请求开始。。。', req.method, req.url)
//     next()
// })

// app.use((req, res, next) => {
//     console.log('处理cookie...')
//     req.cookie = {
//         userId: 'abc123'
//     }
//     next()
// })

// app.use('/api', (req, res, next) => {
//     console.log('处理 /api 路由')
//     next()
// })

// app.get('/api', (req, res, next) => {
//     console.log('get /api 路由')
//     next()
// })

// function loginCheck(req, res, next) {
//     setTimeout(() => {
//         console.log('模拟登陆')
//         next()
//     })
// }

// app.get('/api/get-cookie', loginCheck, (req, res, next) => {
//     console.log('get /api/get-cookie')
//     res.json({
//         errno: 0,
//         data: req.cookie
//     })
// })

// app.listen(8000, () => {
//     console.log('server running...') 
// })