import { FaStar ,FaLocationDot ,FaBriefcase, } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import './index.css'
const JobItem = (props) => {
    const navigate = useNavigate()
    const {jobDetails} = props
    const {companyLogoUrl,employmentType,id,jobDescription,location,packagePerAnnum,rating,title} = jobDetails
    const jobItemDetails = () => {
        navigate(`/jobs/${id}`)
    }
    return(
        <div className="job-item-container" onClick={jobItemDetails}>
            <div className="d-flex mb-3">
                <img src={companyLogoUrl} className='company-logo-job-item' alt="job"/>
            <div>
                <h1 className='job-title'>{title}</h1>
                <h1 className="rating-section"><span><FaStar className="star-icon"/></span> {rating}</h1>
            </div>
            </div>
            <div className="d-flex justify-content-between border-bottom pb-2">
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
            <p className="description-heading">Description</p>
            <p className="description">{jobDescription}</p>
            
        </div>
    )
}
export default JobItem