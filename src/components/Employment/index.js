import './index.css'

const Employment = (props) => {
    const {emplymentDetails,onEmployeeType} = props

    const employeeType = () => {
        onEmployeeType(emplymentDetails.id)
    }
    return(
        <li>
            <input type="checkbox" checked={emplymentDetails.checked} id={emplymentDetails.id} onChange={employeeType} className="checkbox"/>
            <label htmlFor={emplymentDetails.id}>{emplymentDetails.name}</label>
        </li>
    )
}
 export default Employment