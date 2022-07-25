import { Navigate } from "react-router-dom"

const ProtecRoutes = ({children}) => {
    const auth = localStorage.getItem('user');
    
    if(!auth) return <Navigate to="/login" />
    
    return children;
}

export default ProtecRoutes;