import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import login from '../assets/login-mobile.svg'
import loginDesk from '../assets/login-desk.svg'

const Login = () => {

    const {register, handleSubmit} = useForm();

    const navigate = useNavigate();

    const submit = (data) => {
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
        .then(res => {
            localStorage.setItem("token", res.data.data.token)
            navigate('/')
            alert('Starting session')
        }).catch(error => {
            if(error.response.status === 404){
                alert("Nonexistent user")
            }
        })
    };

    const logout = () => {
        localStorage.setItem("token", "");
        alert("Closing session");
        navigate('/')
        if(localStorage.setItem("token"));     
    }

    const signUp = () => {
        alert("This function is currently disabled")
    }

    return (
        <div className='login'>
            <div className="login-content">
                <h3>Welcome! Enter your email and password to continue</h3>
                <div className="test-data-container">
                    <p>Test data</p>
                    <div className="user-test-container">
                        <p><i className='bx bx-envelope'></i>robert_dev@gmail.com</p>
                        <p><i className='bx bx-lock-alt'></i>roberto1234</p>
                    </div>
                </div>
                <form className='login-container' onSubmit={handleSubmit(submit)}>
                    <input 
                    {...register("email")}
                    type="email" 
                    placeholder='Email'
                    />

                    <input 
                    {...register("password")}
                    type="password" 
                    placeholder='Password'
                    />

                    <button type='submit'>
                        Login
                    </button>
                </form>
                <div className="logout-and-creat-container">
                    <p>Do not have an account? <span onClick={signUp}>Sign up</span></p>
                    <i onClick={logout} class='bx bx-log-out-circle'></i>
                </div>
            </div>

            <div className="svg-container">
                <img className='login-mobiile' src={login} alt="" />
            </div>

            <div className="svg-desk-container">
                <img className='login-desk' src={loginDesk} alt="" />
            </div>
        </div>
    );
};

export default Login;