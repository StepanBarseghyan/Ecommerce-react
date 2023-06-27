import React, {useEffect , useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectUsers} from "../../store/slices/users/usersSlice";
import {fetchAllUsers, fetchPostAddUser} from "../../store/slices/users/userAPI";
import s from './Registration.module.css'
import registerVector2 from '../../assets/images/register2.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import {  faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {generatorId} from "../../helpers/generatorId";
import {useNavigate} from "react-router";

const Registration = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {usersData} = useSelector(selectUsers)
    const [error,setError] = useState('')
    const [ava,setAva] = useState('')
    const [icon,setIcon] = useState(false)
    const [icon2,setIcon2] = useState(false)

    const changeFile = (e) => {
        const reader = new FileReader()
        e.target.files[0] && reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setAva(reader.result)
        }
    }

    const changeInputType = (confirm)=> confirm ? setIcon2(prev=> !prev) : setIcon(prev=> !prev)

    function handleSubmit(e){
        e.preventDefault()
        const{firstname,lastname,login,email,password,confPassword} = e.target
        if(usersData.find(user=> user?.login === login.value || user?.email === email.value)){
           return setError('This login or Email address is already in use !')
        }
        if(password.value !== confPassword.value){
          return setError('Those passwords didnt match. Try again.')
        }
        if(login.value.trim().length < 8 || password.value.trim().length < 8){
            return setError('Sorry, Login or Password must be 8 or more characters.')
        }

        let data = {
            id:generatorId(usersData),
            firstname:firstname.value,
            lastname:lastname.value,
            login:login.value,
            email:email.value,
            password:password.value,
            avatar:ava,
            cart:[],
        }

        dispatch(fetchPostAddUser(data))
        navigate('/')
    }
    const clearErrorMessage = ()=> error &&  setError('')
    return (
        <section className={s.register}>
            <div className={s.register__left}>
                <div>
                    <img src={registerVector2} alt="" />
                    <div className={s.register__content}>
                        <h2>Already Having An Account ?</h2>
                        <p>We are happy to have you back</p>
                        <Link to='/'>Login</Link>
                    </div>
                </div>
            </div>
            <div className={s.register__right}>
                <div className={s.center}>
                    <form className={s.register__form} onSubmit={(e)=> handleSubmit(e)}>
                    <h1>Create Account</h1>
                    {/* <p>Get started by creating your new account</p> */}
                    <p className={s.error}>{ error ? <FontAwesomeIcon icon={faTriangleExclamation} /> : '' } {error}</p>
                        <div className={s.name}>
                            <input type="text" name='firstname' placeholder={'Firstname'} required onFocus={clearErrorMessage}/>
                            <input type="text" name='lastname' placeholder={'Lastname'} required onFocus={clearErrorMessage}/>    
                        </div>
                    <input type="text" name='login' placeholder={'Login'} required onFocus={clearErrorMessage}/>
                    <input type="text" name='email' placeholder={'Email'} required onFocus={clearErrorMessage}/>
                    <div className={`${s.password} password`} >
                    <input name='password' type={icon ? "text" : 'password'} placeholder={'Password'} required onFocus={clearErrorMessage}/>
                    <span className={s.eye__icon} onClick={()=> changeInputType()}>{icon ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</span> 
                    </div>
                    <div className={`${s.password} password`}>
                    <input type={icon2 ? "text" : 'password'} name='confPassword' placeholder={'Confirm password'} required onFocus={clearErrorMessage}/>
                    <span className={s.eye__icon} onClick={()=> changeInputType(true)} >{icon2 ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</span> 
                    </div>
                    <input type="file" name='file' accept="image/*" className={s.file_input} onChange={(e)=>changeFile(e)}  required  onFocus={clearErrorMessage}/>
                    <button>Register</button>
                    </form>
                </div>
            </div>
        </section>

    );
};

export default Registration;