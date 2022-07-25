import React, { useState, useEffect, useCallback} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'
import { AddDataToFirebase, ReadDataToFirebase, UpdateDataToFirebase, DeleteDataToFirebase, UserLogout } from '../../../configs/Redux/action/Index';


const initialValue = {
    id : "",
    title: "",
    content: "",
    tanggal: new Date(),
    isUpdate : false
}

function Dashboard({isLogin, notes, AddDataToFirebase, ReadDataToFirebase, UpdateDataToFirebase, DeleteDataToFirebase, UserLogout }) {
    const [ value, setValue] = useState(initialValue)
    const { title, content, isUpdate } = value;

    const userNotes = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();
    const memorizeCallback = useCallback(()=> { ReadDataToFirebase((userNotes.uid)) },[userNotes.uid, ReadDataToFirebase])

    useEffect(()=>{  
 
        memorizeCallback();
     
    },[memorizeCallback])


    const handleChange = (e) => {
        setValue(current => {
            return {
                ...current,
                [e.target.id]: e.target.value
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const datas = {
            title, content, tanggal : new Date(), userId: userNotes.uid
        }
        console.log(datas);

        if(isUpdate){
            UpdateDataToFirebase(userNotes,value);
        }else{
            AddDataToFirebase(datas);
        }
       

        setValue({ title: "", content: "", })
    }

    const handleUpdate = (data) =>{
        setValue({id : data.id, title: data.title , content: data.content, tanggal: new Date(), isUpdate:true})
    }

    const handleDelete = (data) =>  {
        DeleteDataToFirebase(userNotes, data)
    }

    const handleLogout = () => {
        UserLogout()
          .then(()=> {
            return navigate('/login')
        }).catch(()=>{
            return;
        })
        
    }

    return (
        <div className='dashboard-container'>
            <div className='dashboard-card'>
                <h3>Daily Notes {userNotes.email}</h3>
                <button onClick={()=> handleLogout()} className='btn-logout'>Logout</button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' value={value.title} onChange={handleChange} required />

                    <label htmlFor='content'>Content</label>
                    <textarea id='content' value={value.content} onChange={handleChange} required />

                    <button type='submit'>{isUpdate ? "Update" : "Simpan"}</button>
                </form>
            </div>
            <div className='dashboard-result'>
                {notes.length <=  0 ? <p style={{textAlign:"center", marginTop:"20px"}}>Tidak ada notes</p> : 
                notes.map((res,i) => {
                    return (
                        <div key={i + 1} className='dashboard-result-content'>
                            <div className='result-content-data'>
                                <h4>{res.title}</h4>
                                <p className='tanggal-result'>{res.tanggal}</p>
                                <p className=''>{res.content}</p>
                            </div>
                            <div className='result-content-btn'>
                                <button onClick={()=> handleUpdate(res)}>Edit</button>
                                <button onClick={()=> handleDelete(res)}>Hapus</button>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
const reduxState = (state) => {
    return {
        isLogin : state.isLogin,
        notes : state.notes
    }
}
const reduxDispatch = (dispatch) => {
    return {
        AddDataToFirebase: (data) => dispatch(AddDataToFirebase(data)),
        ReadDataToFirebase: (data) => dispatch(ReadDataToFirebase(data)),
        UpdateDataToFirebase : (userId, data) => dispatch(UpdateDataToFirebase(userId, data)),
        DeleteDataToFirebase : (userId, data) => dispatch(DeleteDataToFirebase(userId, data)),
        UserLogout           : (data) => dispatch(UserLogout(data))
    }
}
export default connect(reduxState, reduxDispatch)(Dashboard);