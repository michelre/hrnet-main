import { EmployeesContext} from "../../context"
import { useContext } from "react";
const EmployeeTable = () => {

    const { employees } = useContext(EmployeesContext);
        // Vérifier si employees est défini pour éviter les erreurs
        if (!employees || employees.length === 0) {
            return <p>No employees found.</p>;
        }
    
    return (
        <table>
            <thead>
                <tr>
                    <th>firstName</th>
                    <th>astName</th>
                    <th>Department</th>
                    <th>Date of birth</th>
                    <th>start Date</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip Code</th>
                    <th>Departement</th>
 
                </tr>
            </thead>
            <tbody>
            {employees.map((employee, index) => (
                <tr key={index}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.department}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.startDate}</td>
                <td>{employee.street}</td>
                <td>{employee.city}</td>
                <td>{employee.state}</td>
                <td>{employee.zipCode}</td>
                <td>{employee.department}</td>
            </tr>
            ))}
            </tbody>
        </table>
    );
};

export default EmployeeTable;