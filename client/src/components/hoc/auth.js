import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { auth } from '/Users/yujunho/Documents/boiler-plate/client/src/_actions/user_action.js';
//import { withRouter } from 'react-router-dom';

const Auth = (SpecificComponent, option, adminRoute = null) => {

    //2nd 인자인 option에는 null true false 3가지가 올 수 있다.
    // 각각 아무나 출입 가능 / 로그인한 유저만 출입 가능 / 로그인했으면 출입 불가능
    // 3번째 인자는 admin 유저만 들어가고 싶으면 true 해주는 거. 근데 default가 null
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect( () => {

            dispatch(auth())
            .then(response => {
                console.log(response)

                // 로그인 하지 않은 상태
                if (!response.payload.isAuth) {
                    if(!option) {
                        navigate("/login");
                        
                    }    
                    
                } else {
                    //로그인 한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        navigate("/");
                    } else {
                        if(option === false)
                        navigate("/");
                        
                    }
                }


            } )
            //Axios.get('/api/users/auth')

        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}

export default Auth;