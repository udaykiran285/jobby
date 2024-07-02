import  { useState,useEffect} from 'react'
import { BsSearch } from "react-icons/bs";
import {LineWave,Watch} from "react-loader-spinner"
import {v4 as uuidv4} from 'uuid'
import Cookies from 'js-cookie';
import './index.css'
import JobItem from '../JobItem'
import Navbar from '../Navbar'
import Profile from '../Profile'

import Employemnt from '../Employment'
import Salary from '../Salary'

const employmentConstraints = [ 
    {
        id: uuidv4(),
        name  : "Full Time",
        checked : false,
        value : "FULLTIME"
    },
    {
        id: uuidv4(),
        name  : "Part Time",
        checked : false,
        value  : "PARTTIME"
    },
    {
        id: uuidv4(),
        name  : "Freelance Time",
        checked : false,
        value : "FREELANCE"
    },
    {
        id: uuidv4(),
        name  : "Internship Time",
        checked : false,
        value : "INTERNSHIP"
    }
]

const salaryRangeConstraints = [
    {
        id : uuidv4(),
        name : "10 LPA and above",
        checked: false,
        value : 1000000
    },
    {
        id : uuidv4(),
        name : "20 LPA and above",
        checked: false,
        value : 2000000
    },
    {
        id : uuidv4(),
        name : "30 LPA and above",
        checked: false,
        value : 3000000
    },
    {
        id : uuidv4(),
        name : "40 LPA and above",
        checked: false,
        value : 4000000
    }
]

const apiStatusConstraints = {
    success : "success",
    failure : "failure",
    loading : "loading"
}

const Jobs = () => {
    const [displayEmploymentConstraints,setEmploymentConstraints] = useState(employmentConstraints)
    const [displaySalaryRangeConstraints,setSalaryRangeConstraints] = useState(salaryRangeConstraints)

    const [jobsList,setJobsList] = useState([])
    const [jobListApiStatus,setJobListApiStatus] = useState(apiStatusConstraints.loading)
    const [selectedEmployeementTypes,setSelectedEmploymentTypes] = useState([])
    const [selectedSalary,setSelectedSalary] = useState(1000000)
    const [searchValue,setSearchvalue] = useState("")

    useEffect(() => {
         fetchJobListApi()
    },[selectedSalary,searchValue,selectedEmployeementTypes])

    const onEmployeeType = (uniqueId) => {
        const updatedEmployeeList = displayEmploymentConstraints.map(eachItem => {
            if(eachItem.id === uniqueId){
                return {
                    ...eachItem,
                    checked : !eachItem.checked
                }
            }
            return {...eachItem}
        })
        setEmploymentConstraints(updatedEmployeeList)
        setSelectedEmploymentTypes(updatedEmployeeList.filter(eachItem => eachItem.checked))
    }

    const onSalaryChanged = (uniqueId) => {
        let userSelectedSalary = null
        const updatedSalaryList = displaySalaryRangeConstraints.map(eachItem => {
            if(eachItem.id === uniqueId){
                userSelectedSalary = eachItem.value
                return {
                    ...eachItem,
                    checked : !eachItem.checked
                }
            }
            return {...eachItem,checked : false}
        })
        setSelectedSalary(userSelectedSalary)
        setSalaryRangeConstraints(updatedSalaryList)
        setJobListApiStatus(apiStatusConstraints.loading)
    }

    const onUserInput = (event) => {
        setSearchvalue(event.target.value)
        setJobListApiStatus(apiStatusConstraints.loading)
        fetchJobListApi()
    }

    const fetchJobListApi = async () => {
        const jwtToken = Cookies.get("jwt_token")
        let empTypesApi = "";
        for(let eachItem of selectedEmployeementTypes){
           empTypesApi.length === 0 ?  empTypesApi += eachItem.value : (empTypesApi += "," + eachItem.value)
        }

        const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empTypesApi}&minimum_package=${selectedSalary}&search=${searchValue}`
        const options = {
            method : "GET",
            headers : {
                Authorization : `Bearer ${jwtToken}`
            }
        }
        try{
            const response = await fetch(apiUrl,options)
            if(response.ok){
                const jsonData = await response.json()
                const updatedJobList = jsonData.jobs.map(eachItem => ({
                    companyLogoUrl : eachItem.company_logo_url,
                    id  : eachItem.id,
                    employmentType : eachItem.employment_type,
                    jobDescription : eachItem.job_description,
                    location : eachItem.location,
                    rating : eachItem.rating,
                    packagePerAnnum : eachItem.package_per_annum,
                    title : eachItem.title,
                }))
                setJobListApiStatus(apiStatusConstraints.success)
                setJobsList(updatedJobList)
        }
        }
        
        catch(e){
            setJobListApiStatus(apiStatusConstraints.failure)
        }    
        
    }


    const renderJobs = () => (
        <ul className='job-items-container'>
        {jobsList.map(eachItem => <JobItem key={eachItem.id} jobDetails={eachItem}/>)} 
    </ul>
    )

    const renderLoading = () => (
        <div className='row'>
        <div className='jobs-container col-3'>
            <aside>
                <Profile />
                <div className='employment-type-container'>
                    <p>Type of Employment</p>
                    <ul>
                        {displayEmploymentConstraints.map(eachItem => <Employemnt key={eachItem.id} emplymentDetails={eachItem} onEmployeeType={onEmployeeType}/>)}
                    </ul>
                </div>
                <div className='employment-type-container'>
                <p>Type of Employment</p>
                    <ul>
                        {displaySalaryRangeConstraints.map(eachItem => <Salary key={eachItem.id} salaryDetails={eachItem} onSalaryChanged={onSalaryChanged}/>)}
                    </ul> 
                </div>
            </aside>
        </div>
        <div className='col-9'>
            <div className='main-search-container'>
                <input type='search' autoFocus value={searchValue} onChange={onUserInput} placeholder='Search..' className='main-search-input'/>
                <div className='search-icon'>
                    <BsSearch/>
                </div>
            </div>
            <div className='jobs-container-bg-loading'> 
            <div className="loader-container" data-testid="loader">
                <Watch type="ThreeDots" color="#ffffff" height="50" width="50" />
                </div>
            </div>
        </div>
    </div>
    )

    switch(jobListApiStatus){
        case apiStatusConstraints.loading:
            return(<>
                <Navbar/>
                <main className='container-fluid bg-black d-none d-md-block'>
                    {renderLoading()}
                    </main>
                    </>)
        case apiStatusConstraints.success:
            return(<>
                <Navbar/>
                <main className='container-fluid bg-black'>
                <div className='row'>
                <div className='jobs-container col-md-3 d-none d-md-block'>
                    <aside>
                        <Profile />
                        <div className='employment-type-container'>
                            <p>Type of Employment</p>
                            <ul>
                                {displayEmploymentConstraints.map(eachItem => <Employemnt key={eachItem.id} emplymentDetails={eachItem} onEmployeeType={onEmployeeType}/>)}
                            </ul>
                        </div>
                        <div className='employment-type-container'>
                        <p>Type of Employment</p>
                            <ul>
                                {displaySalaryRangeConstraints.map(eachItem => <Salary key={eachItem.id} salaryDetails={eachItem} onSalaryChanged={onSalaryChanged}/>)}
                            </ul> 
                        </div>
                    </aside>
                </div>
                <div className='col-md-9 col-12'>
                        <div className='main-search-container col-md-6'>
                            <input type='search' autoFocus value={searchValue} onChange={onUserInput} placeholder='Search..' className='main-search-input'/>
                            <div className='search-icon'>
                                <BsSearch/>
                            </div>
                        </div>
                    {renderJobs()}
                    
                </div>
            </div>
                    </main>
                    </>)
        case apiStatusConstraints.failure:
            return(<div>
                <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" className='w-100'/>
                <h1>No Jobs</h1>
                </div>)
        default :
        return null;
    }
}


export default Jobs