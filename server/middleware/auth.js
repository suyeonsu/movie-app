const { User } = require('../models/User')


let auth = (req, res, next) => {

    // 인증 처리
    // client cookie에서 token을 가져옴
    let token = req.cookies.x_auth

    // token을 복호화하고 유저를 찾음
    User.findByToken(token, (err, user) => {
        if(err) throw err
        if(!user) return res.json({ isAuth: false, error: true }) // 유저가 없으므로 인증실패, 에러전달

        req.token = token
        req.user = user
        next()
    })
}

module.exports = { auth }