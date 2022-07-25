// import logo from '../../../assets/img/logo/logo.svg';
import { useEffect } from 'react';
import './App.css';
import Login from '../Login/Index';
import Dashboard from '../Dashboard/Index';
import Register from '../Register/Index';
import { Routes, Route} from "react-router-dom";
import ReduxProvider from '../../../configs/Redux/Index.js'
import ProtecRoutes from '../../../configs/routes/ProtectedRoute/Index';


function App() {

  useEffect(()=>{
    document.title = "Firebase Redux";
  },[])

  return (
    <div>
      <ReduxProvider>
        <Routes>
          <Route path="/" element={<ProtecRoutes> <Dashboard /> </ProtecRoutes> } />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </ReduxProvider>
    </div>
  );
}


export default App;
