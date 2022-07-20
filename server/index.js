const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 안녕하시렵니까-?'))

app.get('/api/hello', (req, res) => res.send("hi hi~~"))

// 회원가입 route
// client에서 가져온 정보를 db에 넣는다
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
  return res.status(200).json({ success:true })
  })
})

// 로그인 route
// 1. 요청된 e-mail을 db에 검색 2. e-mail이 존재하면 pw 일치 확인 3. pw 일치시 토큰 생성
app.post('/api/users/login', (req, res) => {
  
  // 1
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "입력된 이메일과 일치하는 회원정보가 없습니다."
      })
    }
    
    // 2
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) 
        return res.json({ loginSuccess: false, message: "비밀번호가 일치하지 않습니다." })

      // 3
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err)

        // 토큰을 저장함. 어디에?? 쿠키, 로컬스토리지, 세션 등 (여기에선 쿠키 사용)
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

// authentication route
app.get('/api/users/auth', auth, (req, res) => {
 
  // 여기까지 미들웨어를 통과했다면 authentication이 true라는 의미로, 유저정보 전달
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // 0 일반유저, 1 어드민, 2 특정 어드민
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })

})

// 로그아웃 route
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, 
    { token: "" },
    (err, user) => {
      if(err) return res.json({ success: false, err })
      return res.status(200).send({
        success:true
      })
    })
})


const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})