import { Link } from "react-router-dom";
import Form from "../../components/form/Form";
const Home =( ) => {


    return (
        <div className="container">
            <Link to="employees">View Current Employees</Link>
        
                   <h2>Create Employee</h2>
                   <Form />
                   </div>
    )
}
export default Home;