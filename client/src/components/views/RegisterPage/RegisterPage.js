import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
//import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action'
import { registerUser } from '../../../_actions/user_action'
//import Auth from './components/hoc/auth'
import Auth from '/Users/yujunho/Documents/boiler-plate/client/src/components/hoc/auth.js'

function RegisterPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log('Email', Email)
        console.log('Password', Password)

        if(Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }
        //redux 안쓸땐 이렇게 함    
        //axios.post('/api/users/register', body)


        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success) {
                //props.history.push("/")
                alert("회원가입이 완료되었습니다.");
                navigate("/login");
            } else {
                alert('Failed to register')
            }
        })
        

        
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>

            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
                >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <button>
                    Register
                </button>

            </form>
        </div>
    )
}

//export default Auth(RegisterPage, false)
export default RegisterPage