import Cookies from "js-cookie"
import { Navigate, Outlet} from "react-router-dom"
const ProtectedRoute = () => {
    const jwtToken = Cookies.get("jwt_token")
    return jwtToken === undefined ?  <Navigate to="/login"/> : <Outlet/> 
}

export default ProtectedRoute