import Cookies from 'js-cookie'
import {useNavigate,Link} from 'react-router-dom'
import './index.css'


const Navbar = () => {
    const navigate = useNavigate()
    const onLogout = () => {
        Cookies.remove("jwt_token")
        navigate("/login")
    }
    return(
        <nav>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='navbar-bg d-flex flex-row justify-content-around align-items-center'>
                        <a href="/" className='d-none d-md-inline'><img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" className='navbar-logo-section' alt="navbar-logo" /></a>
                        <ul className='d-flex flex-row col-3'>
                            <Link to="/" className='navbar-links'><li>Home</li></Link>
                            <Link to="/jobs" className='navbar-links'><li>Jobs</li></Link>
                        </ul>
                        <button type="button" className="logout-button" onClick={onLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar