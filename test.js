const express = require('./myExpress')

const app = express()

app.use((req, res, next) => {
    console.log('请求开始。。。', req.method, req.url)
    next()
})

app.use((req, res, next) => {
    console.log('处理cookie...')
    req.cookie = {
        userId: 'abc123'
    }
    next()
})

app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由')
    next()
})

app.get('/api', (req, res, next) => {
    console.log('get /api 路由')
    next()
})

function loginCheck(req, res, next) {
    setTimeout(() => {
        console.log('模拟登陆')
        next()
    })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie')
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.listen(8000, () => {
    console.log('server running...') 
})