import React, {useState} from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserLogin } from '../../../configs/Redux/action/Index';

const initialState = {
    email : "",
    password : ""
}

function Login({isLoading, UserLogin}){
   
    let navigate = useNavigate();
    const [value, setValue] = useState(initialState);

    const handleChange = (e) => {
        setValue(current => {
            return {
                ...current,
                [e.target.name] : e.target.value,
            }
        })
    }

    const handleSubmit = (e) => {
       e.preventDefault();
        const {email, password} = value;

        if(email === "" && password === "")return;

        UserLogin({email, password})
        .then((res) => {
            
            setValue({email:"", password:""})
            return navigate('/')

        }).catch((err) => {

            return null

        });

    }

    return(
        <div>
            <div className='container-form'>
            <h3>Login</h3>
            <div className="card-form">
                <form onSubmit={handleSubmit} >

                    <label htmlFor='email'>email</label>
                    <input type="email" value={value.email} onChange={handleChange}  id="email"  name="email" />

                    <label htmlFor='password'>password</label>
                    <input type="password" value={value.password} onChange={handleChange}  id="password" name="password" />

                    {isLoading ? <button style={{cursor:"not-allowed"}}>Mohon tunggu . . .</button> : <button type='submit'>Login</button> }
                </form>

                <p>Belum punya akun? <Link to='/register'>Daftar di sini.</Link></p>
            </div>
        </div>
        </div>
    )}

const reduxState = (state) => {
    return {
        isLoading : state.isLoading
    }
} 

const reduxDispatch = (dispatch) => {
    return{
        UserLogin : (data)=> dispatch(UserLogin(data))
    }
}

export default connect(reduxState, reduxDispatch)(Login);