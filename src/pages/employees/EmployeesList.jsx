import { EmployeesContext } from "../../context";
import { useContext } from "react";

const EmployeesList = () => {
    const {employees} = useContext(EmployeesContext)
    return (
        <div>
        <h1>Employees List</h1>
        {JSON.stringify(employees)}
        </div>
    );
};
export default EmployeesList;