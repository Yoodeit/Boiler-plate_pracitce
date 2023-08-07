const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser"); //다운로드 받은 bodyParser 불러오기
const cookieParser = require("cookie-parser"); //다운받은 cookieParser 불러오기
const { User } = require("./models/User"); // 만들어 놓은 모델 가져오기
const config = require("./config/key");
const { auth } = require("./middleware/auth");

// bodyParser에 옵션 주기
app.use(bodyParser.urlencoded({ extended: true })); //<application/x-www-form-urlencoded> 이 형식의 데이터를 가져와서 분석할 수 있게 해 줌.
app.use(bodyParser.json()); ////<application/json> 형식의 데이터를 가져올 수 있게 함.
app.use(cookieParser());

const mongoose = require("mongoose");
//const bodyParser = require('body-parser');
mongoose
    .connect(config.mongoURI, {
        //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log("MongoDB is successfully connected..."))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World!");
});
/*
app.get('/', function (req, res) {
  res.send('root');
});
*/

app.get('/api/hello', (req, res) => {
    res.send('아ㄴ녕하세요')
})

//회원가입을 위한 route 작성
app.post("/api/users/register", async (req, res) => {
    const user = new User(req.body);

    const result = await user
        .save()
        .then(() => {
            res.status(200).json({
                success: true,
            });
        })
        .catch((err) => {
            res.json({ success: false, err });
        });
});

/*
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
    
    await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        success: false,
        err: err,
      });
    });
    */

/*
app.post('/login', (req, res) => {
    //로그인 라우트
    //일단 넣은 메일주소가 있는지부터 확인
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "유저가 아닙니다"
            })
        }
        
        //있다고 하면 비밀번호가 맞는지를 확인
        user.comparePassword(req.body.password , (err, isMatch ) => {
            if(!isMatch)
            return res.json({
                loginSuccess: false,
                message: '비밀번호가 틀렸습니다'
            })
            //비밀번호가 맞으면 토큰 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                //token을 어디다 저장 ? -> 쿠키에 저장할 수도 있고, 로컬스토리지에 저장해도 되고, 세션도 있고
                //일단은 쿠키에 담아보겠음.
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess: true,
                    userId: user._id
                });
            });
        });
    })
});
*/

app.post("/api/users/login", (req, res) => {
    // 요청된 이메일을 데이터베이스 찾기
    User.findOne({ email: req.body.email })
        .then((docs) => {
            if (!docs) {
                return res.json({
                    loginSuccess: false,
                    messsage: "제공된 이메일에 해당하는 유저가 없습니다.",
                });
            }
            docs.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch)
                    return res.json({
                        loginSuccess: false,
                        messsage: "비밀번호가 틀렸습니다.",
                    });
                // Password가 일치하다면 토큰 생성
                docs.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    // 토큰을 저장
                    res
                        .cookie("x_auth", user.token)
                        .status(200)
                        .json({ loginSuccess: true, userId: user._id });
                });
            });
        })
        .catch((err) => {
            return res.status(400).send(err);
        });
});

app.get("/api/users/auth", auth, (req, res) => {
    //이 이후로 쓰이는 코드는 auth middleware를 거친 이후의 내용.
    //그걸 거치고 이 함수로 넘어오려면 Authentication 결과가 true 였어야 함.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, //0이면 일반유저 0 이외는 어드민인 컨셉
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});




app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({_id:req.user._id}, {token: "" })
    .then(() => {
        //if (err) return res.json({ success: false, err });
        console.log(req.user._id);
        res.status(200).send({
            logoutSuccess: true
        });
    })
    .catch((err) => {
        return res.json({ success: false, err });
        //return res.status(400).send(err);
    })
});


/*
app.get('/api/users/logout', auth, (req, res) => {

    // console.log('req.user', req.user)
   
   User.findOneAndUpdate({ _id: req.user._id },
   
   { token: "" }
   
   , (err, user) => {
   
   if (err) return res.json({ success: false, err });
   
   return res.status(200).send({
   
   success: true
   
   })
   
   })
   
   })
*/
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
