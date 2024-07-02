import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const Home = () => (
        <>
        <Navbar />
        
        <div className='container-fluid'>
            <div className='row'>
            <div className='home-section d-flex flex-column justify-content-center pt-lg--5'>
                <div className='col-sm-6 offset-md-1'>
                    <h1>Find The Job That Fits Your Life</h1>
                    <p>Millions of people are searching for jobs, salary information, company reiews. Find the job that fits your abilities and potential.</p>
                    <Link to="/jobs"><button className='logout-button'>Find Jobs</button></Link>
                </div>
                
            </div>
        </div>
    </div>
    </>
)

export default Home