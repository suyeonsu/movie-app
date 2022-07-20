const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next) {
    var user = this

    // 비밀번호 변경시
    if (user.isModified('password')) {
      // 비밀번호 암호화
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function (err, hash) {
          // this.password는 plain pw, hash는 암호화된 pw
          if (err) return next(err)
          user.password = hash
          next()
        })
      })
    } else { 
        next()
    }
})

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = function(plainPassword, cbFunc) {

    // plainPassword와 db에 저장된 암호화된 비밀번호가 일치하는지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cbFunc(err)
        cbFunc(null, isMatch) // 에러없고, 비밀번호가 일치함
    })
}

// 토큰 생성 메서드
userSchema.methods.generateToken = function(cbFunc) {
    var user = this

    // jsonwebtoken을 이용해 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err, user) {
        if(err) return cbFunc(err)
        cbFunc(null, user)  // 에러없고, 유저정보 전달
    })
}

userSchema.statics.findByToken = function(token, cbFunc) {
    var user = this

    // 토큰 decode
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 id를 이용해 유저 탐색
        // 클라이언트에서 가져온 토큰과 db의 토큰을 비교
        user.findOne({ "_id": decoded, "token": token }, function(err, user) {
            if(err) return cbFunc(err)
            cbFunc(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }