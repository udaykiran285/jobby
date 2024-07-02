const Salary = (props) => {
    const {salaryDetails,onSalaryChanged} = props
    const onSalary = () => {
        onSalaryChanged(salaryDetails.id)
    }
    return(
        <li>
            <input type="radio" name="salary" id={salaryDetails.id} className="checkbox" checked={salaryDetails.checked} onChange={onSalary}/>
            <label htmlFor ={salaryDetails.id}>{salaryDetails.name}</label>
        </li>
    )
    
}

export default Salary