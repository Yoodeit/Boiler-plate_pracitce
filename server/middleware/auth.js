const { User } = require('../models/User');

let auth = (req, res, next) => {
    //인증처리 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth; //토큰을 쿠키에서 가져오는 코드
    console.log("client side에서 가져온 token :\n", token)
    //let token = req.cookies['x_auth']

    //console.log("in auth.js : ", token);


    // 토큰 복호화해서 유저 목록 중에 찾는다
    User.findByToken(token, (err, user) => {
        if(err) throw err;

        if(!user) return res.json({ isAuth: false, error:true})
        //console.log(err);
        //console.log(user);

        console.log("원래 레크토큰:", req.token);
        req.token = token;
        console.log("인가 후 레크토큰:", req.token);
        //console.log(req.token);
        console.log("원래 레크유저:", req.user);
        req.user = user;
        console.log("인가 후 레크유저:", req.user);
        console.log("인가 후 레크유저의 아이디:", req.user._id);
        //console.log(req.user);
        next(); //미들웨어 다음 흐름으로 넘어갈 수 있게

    })

    // 맞으면 인증 오케이

    // 안맞으면 놉

}

module.exports = { auth };