import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
//import { withRouter } from 'react-router-dom';
//import Auth from './components/hoc/auth'
import Auth from '/Users/yujunho/Documents/boiler-plate/client/src/components/hoc/auth.js'

function LandingPage() {

    const navigate = useNavigate();

    useEffect( () => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [] )

    const [Connected, setConnected] = useState(true);

    





    /*

    onClickHandler( () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
                alert('로그아웃에 성공했습니다.')
                navigate("/login");
            } else {
                alert('로그아웃에 실패했습니다.')
            }
            
        })

    })
    */
    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.logoutSuccess) {
                console.log(response.data)
                alert('로그아웃에 성공했습니다.')
                setConnected(false)
                navigate("/login");
            } else {
                alert('로그아웃에 실패했습니다.')
            }
            
        })

    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
            <div>
                {Connected ? <button onClick={onClickHandler}>logout</button> : null }
            </div>
            
           
            
        </div>
    )
}
export default Auth(LandingPage, null)
//export default LandingPage