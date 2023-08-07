const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //사용자가 스페이스바(공백)을 포함해서 작성하더라도 없애주는 역할.
        unique: 1 //같은 이메일을 쓰지 못하게.
    },
    password: {
        type: String,
        minlength: 5,
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

/*
userSchema.pre('save', async function (next) {
    const user = this;
    // 비밀번호를 암호화시킴.

    if (user.isModified('password')) {
        // password가 변화될 때만 hash
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash; // plain password가 hash로 바뀌는 부분
            // Store hash in your password DB.
            // 첫 번째 인자인 user.password는 Plain password
            next();
        } catch (err) {
            return next(err);
        }
    } else {
        next();
    }
});
*/


userSchema.pre('save', function (next) {
    var user = this;
    //비밀번호를 암호화시킴.

    if (user.isModified('password')) {
        //password가 변화될 때만 hash
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash //plain password가 hash로 바뀌는 부분
                next()
                // Store hash in your password DB.
                //첫 번째 인자인 user.password는 Plain password
            });
        });
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //유저가 입력한 패스워드랑 데이터베이스에 등록된 암호화된 패스워드가 같은지를 봐야 함.
    //단방향 암호화라서 복호화는 불가능하고, 유저가 입력한 패스워드를 또 암호화해서 같은지를 체크하는 방식.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    //jsonwebtoken을 이용해서 token 생성
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token
    user.save()
    .then(() => {
        return cb(null, user)
    }).catch((err)=>{
        return cb(err)
    })
    /*
    user.save(function(err, user) {
        if(err) return cb(err);
          cb(null, user)
    })
    */
}

userSchema.statics.findByToken = function ( token, cb) {
    var user = this;

    // token을 decode 한다
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //복호화해서 구한 유저 아이디를 이용해 유저 찾기
        console.log("토큰을 복호화해서 찾은 유저아이디: \n", decoded);
        console.log("토큰:\n",token);
        user.findOne({ "_id":decoded, "token":token })
        .then( (user)=> {
            console.log("successfully found user", user)
            return cb(null, user)
                   
        })
        .catch((err)=>{
            console.log("can't find user")
            return cb(err)
               
        })

        })

        //클라이언트에서 가져온 토큰과 디비에 저장된 토큰이 같은지 확인
    }

const User = mongoose.model('user', userSchema);
//mongoose.model() 메서드의 첫 번째 인자로 주는 user는 컬렉션 명인 users가 됩니다.

module.exports = { User };
// 여러 개를 한 번에 넣으려면 중괄호 안에 넣습니다.
// 이 경우에는 User 하나라서 중괄호로 굳이 안감싸도 됩니다.


