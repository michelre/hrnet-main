import EmployeeTable from '../../components/table/EmployeeTable'
import "./list.css"
const EmployeesList = () => {
   
    return (
        <div className="container-list">
        <h1>Current Employees</h1>
        <EmployeeTable />
        <a href="/">Home</a>
        </div>

    );
};
export default EmployeesList;