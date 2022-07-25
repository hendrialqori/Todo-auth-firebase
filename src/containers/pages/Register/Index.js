import './register.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { UserRegister } from '../../../configs/Redux/action/Index';

const initialValueRegister = {
    email: "",
    password: "",
    passwordConfirm : ""
}

function Register({isLoading ,UserRegister}) {

    const [value, setValue] = useState(initialValueRegister)

    const handleChange = (e) => {
        setValue(current => {
            return {
                ...current,
                [e.target.name]: e.target.value
            }
        })

    }

    const handleSubmitRegister = (e) => {
        e.preventDefault();

        const { email, password, passwordConfirm } = value;

        if (email === "" && password === "") return;

        UserRegister({email, password, passwordConfirm})
        .then(res => {
            setValue({email : "", password : "", passwordConfirm : ""})
        })
        .catch(err => {
            return;
        })
    }

    return (
        <div className='container-form'>
            <h3>Register Account</h3>
            <div className="card-form">
                <form onSubmit={handleSubmitRegister}>

                    <label htmlFor='email'>username</label>
                    <input type="email" value={value.email} id="email" onChange={handleChange} name="email" />

                    <label htmlFor='password'>password</label>
                    <input type="password" value={value.password} id="password" onChange={handleChange} name="password" />

                    <label htmlFor='password'>password confirm</label>
                    <input type="password" value={value.passwordConfirm} id="password" onChange={handleChange} name="passwordConfirm" />

                    
                    {isLoading ? <button style={{cursor:"not-allowed"}}>Mohon tunggu . . .</button> : <button type='submit'>Register</button> }
                </form>
            </div>
            <p>have an account yet? <Link to='/login'>Sign in </Link></p>
        </div>
    )
}

const reduxState = (state) => ({ isLoading : state.isLoading})

const reduxDispatch = (dispatch) => {
    return {
        UserRegister : (data) => dispatch(UserRegister(data))

    }
}

export default connect(reduxState, reduxDispatch) (Register);