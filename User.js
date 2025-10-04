// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 비밀번호 해싱을 위한 salt round 수

// 사용자 정보에 대한 스키마(설계도) 정의
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // 아이디 (문자열, 필수, 중복 불가)
    password: { type: String, required: true }                // 비밀번호 (문자열, 필수)
});

// 주석: 사용자를 데이터베이스에 저장하기 '직전(pre)'에 실행되는 함수
// save 이벤트가 발생하기 전에 비밀번호를 암호화합니다.
userSchema.pre('save', function(next) {
    const user = this; // this는 저장될 사용자 문서를 가리킴

    // 주석: 비밀번호가 새로 생성되었거나 변경되었을 때만 암호화를 수행
    if (user.isModified('password')) {
        // bcrypt.genSalt: 비밀번호 암호화를 위한 salt를 생성
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return next(err);

            // bcrypt.hash: 생성된 salt를 이용해 사용자의 비밀번호를 해싱(암호화)
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash; // 암호화된 해시값으로 비밀번호를 교체
                next(); // 다음 미들웨어(실제 저장 로직)로 이동
            });
        });
    } else {
        next(); // 비밀번호 변경이 없으면 그냥 통과
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
