import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaStar ,FaLocationDot ,FaBriefcase} from "react-icons/fa6";
import { TiExport } from "react-icons/ti";
import {ThreeDots} from 'react-loader-spinner'
import Cookies from 'js-cookie';
import Navbar from '../Navbar'

import './index.css'
const apiStatusConstraints = {
    loading : "loading",
    success : "success",
    failure : "failure"
}


const JobItemDetails = (props) => {
    const [jobItemDetails,setJobItemDetails] = useState({})
    const [apiStatus,setApiStatus] = useState(apiStatusConstraints.loading)

    const {id} = useParams()

    const fetchJobItemDetails = async () => {
        const jwtToken = Cookies.get("jwt_token")
        const apiUrl = `https://apis.ccbp.in/jobs/${id}`
        const options = {
            method : "GET",
            headers : {
                Authorization : `Bearer ${jwtToken}`
            }
        }
        const response = await fetch(apiUrl,options)
        if(response.ok){
            const jsonData = await response.json()
            const jobDetails = jsonData.job_details
            const similarJobs = jsonData.similar_jobs
            const updatedJobItemDetails = {
                companyLogoUrl : jobDetails.company_logo_url,
                companyWebsiteUrl : jobDetails.company_website_url,
                id  : jobDetails.id,
                employmentType : jobDetails.employment_type,
                jobDescription : jobDetails.job_description,
                lifeAtCompany : jobDetails.life_at_company,
                location : jobDetails.location,
                rating : jobDetails.rating,
                packagePerAnnum : jobDetails.package_per_annum,
                title : jobDetails.title,
                skills : jobDetails.skills,
                similarJobs
            }
            setJobItemDetails(updatedJobItemDetails)
            setApiStatus(apiStatusConstraints.success)
        }
       
    }

    useEffect(() => {
        fetchJobItemDetails()
    },[])


    const renderJobItemDetails = () => {
        const {companyLogoUrl,employmentType,jobDescription,location,packagePerAnnum,rating,title,skills,lifeAtCompany,companyWebsiteUrl,similarJobs} = jobItemDetails
        const {description,image_url} = lifeAtCompany
         return(
            <>
                <Navbar/>
                <div className='container-fluid bg-black'>
                    <div className='row'>
                        <div className="job-item-details-container m-3 m-md-5 p-3 p-md-5">
                            <div className="d-flex mb-3">
                                <img src={companyLogoUrl} className='company-logo-job-item' alt="job"/>
                            <div>
                                <h1 className='job-title'>{title}</h1>
                                <h1 className="rating-section"><span><FaStar className="star-icon"/></span> {rating}</h1>
                            </div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom mb-3 pb-2">
                                <div className="d-flex">
                                    <div className="d-flex align-items-start">
                                        <FaLocationDot className="location-icon"/>
                                        <h1 className="location-section">{location}</h1>
                                    </div>
                                    <div className="d-flex align-items-start">
                                        <FaBriefcase  className="location-icon"/>
                                        <h1 className="location-section">{employmentType}</h1>
                                    </div>
                                </div>
                                <p className="salary-section">{packagePerAnnum}</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className="description-heading-job-item">Description</p>
                                <div className='d-flex'>
                                    <TiExport className='visit-site-icon'/>
                                    <a href={companyWebsiteUrl} rel="noopener noreferrer" target="_blank" className='visit-site-section'>Visit Site</a>
                                </div>
                            </div>
                            <p className="description-job-item">{jobDescription}</p>
                            <p className='description-heading'>Skills</p>
                            <div className='container-fluid'>
                                <div className='row'>
                                    {skills.map(eachItem =>{
                                    const {name,image_url} = eachItem
                                    return(
                                        <div className='col-12 col-md-4 d-flex align-items-center skill-container'>
                                            <img src={image_url} alt="skill"className='skill-image' />
                                            <p>{name}</p>
                                        </div>
                                    )})}
                                </div>
                            </div>
                            <p className="description-heading-job-item">Life At company</p>
                            <div className='row'>
                                <p className="description-job-item col-11 col-md-6">{description}</p>
                                <img src={image_url} alt="company" className='company-image-life col-11 col-md-6'/>    
                            </div>
                        </div>
                        <h1 className='similar-jobs-main-heading'>Similar Jobs</h1>
                        <div className='container'>
                            <div className='row'>
                            {similarJobs.map(eachItem => {
                                const {company_logo_url,employment_type,id,location,job_description,title,rating} = eachItem
                                return(
                                    <div className='similar-jobs-container col-11 col-md-3'>
                                        <div className="d-flex m-2">
                                            <img src={company_logo_url} className='company-logo-job-item' alt="job"/>
                                            <div>
                                                <h1 className='job-title'>{title}</h1>
                                                <h1 className="rating-section"><span><FaStar className="star-icon"/></span> {rating}</h1>
                                            </div>
                                        </div>
                                        <p className="similar-job-description-heading-job-item">Description</p>
                                        <p className="similar-job-description-job-item">{job_description}</p>
                                        <div className="d-flex mt-3">
                                            <div className="d-flex align-items-start">
                                                <FaLocationDot className="location-icon"/>
                                                <h1 className="location-section">{location}</h1>
                                            </div>
                                            <div className="d-flex align-items-start">
                                                <FaBriefcase  className="location-icon"/>
                                                <h1 className="location-section">{employment_type}</h1>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    

    switch(apiStatus){
        case apiStatusConstraints.loading:
            return(<ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />)
        case apiStatusConstraints.failure:
            return(<h1>Failure</h1>)
        case apiStatusConstraints.success:
            return (
                renderJobItemDetails()
            )
        default:
            return null
    }
}

export default JobItemDetails