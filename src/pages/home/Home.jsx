import { Link } from "react-router-dom";
import Form from "../../components/form/Form";
import { useContext } from "react";
import {EmployeesContext} from "../../context";


const Home =( ) => {
    const {employees, setEmployees} = useContext(EmployeesContext)
    console.log(employees, setEmployees)

    return (
        <div className="container">
            <Link to="employees">View Current Employees</Link>
        
                   <h2>Create Employee</h2>
                   <Form />
                   </div>
    )
}
export default Home;