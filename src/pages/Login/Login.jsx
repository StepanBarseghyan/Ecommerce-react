import React, {useState,useRef} from 'react';
import s from './Login.module.css'
import loginVector from '../../assets/images/login.svg'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {isAuthAdmin, logIn, selectUsers} from "../../store/slices/users/usersSlice";
import {useNavigate} from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const dispatch = useDispatch()
    const {usersData,blockedUsers} = useSelector(selectUsers)
    const [error,setError] = useState('')
    const loginRef = useRef()
    const navigate = useNavigate()
    console.log(usersData)
    console.log(blockedUsers)

    const handlerSubmit = (e) => {
        e.preventDefault()
        const [{value:login},{value:password}] = loginRef.current;
        const findUser = usersData.find(user => (user.login === login || user.email === login) && user.password === password)
        const findAdmin = usersData.find(user => (user.login === login || user.email === login) && user.password === password && user.admin)
        
        if(blockedUsers.find(user=> user.id === findUser.id)){
            navigate("/blockedPage",{replace:true})
            return
        }

        if(findAdmin){
            dispatch(logIn(findAdmin))
            dispatch(isAuthAdmin())
            navigate("/adminPage",{ replace: true })
            return
        }

        if(findUser){
           dispatch(logIn(findUser))
            navigate("/homePage",{ replace: true })
            return
        }
        return setError('Incorrect Login or Password.')
    }
    const clearErrorMessage = ()=> error &&  setError('')
    return (
        <section className={s.login}>
            <div className={s.login__left}>
                <div>
                    <form onSubmit={handlerSubmit} ref={loginRef}>
                    <h1>Login</h1>
                    <p className={s.error}>{ error ? <FontAwesomeIcon icon={faTriangleExclamation} /> : '' } {error}</p>
                        <input type="text"  placeholder='Login or Email address' onFocus={clearErrorMessage}/>
                        <input type="password" placeholder='Password' onFocus={clearErrorMessage}/>
                        <button>Login</button>
                    </form>
                    <div className={s.test}>
                    <h2>Example</h2>
                    <p><span><b>Admin-Login: </b>Admin1</span> <span><b>Password: </b>Admin123</span></p>
                    <p><span><b>User-Login: </b>Patrick123</span> <span><b>Password: </b>Patrick123</span></p>
                    </div>
                </div>
            </div>
            <div className={s.login__right}>
                <div>
                    <img src={loginVector} alt="" />
                    <div className={s.login__right_content}>
                        <h2>doesn't have an account yet ?</h2>
                        <Link to='/Registration'>Register</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;