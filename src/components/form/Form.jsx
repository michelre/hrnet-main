import { useContext, useState } from "react";
import { EmployeesContext } from "../../context"; 
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const { employees, setEmployees } = useContext(EmployeesContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  });

  // Gestion des changements des inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Gestion du submit du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployeesData = [...employees, formData];

    setEmployees(newEmployeesData);
    localStorage.setItem("employeesData", JSON.stringify(newEmployeesData)); 

    navigate("/employees");  
  };

  return (
    <form id="create-employee" onSubmit={handleSubmit}>
      <label htmlFor="first-name">First Name</label>
      <input
        type="text"
        id="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="date-of-birth">Date of Birth</label>
      <input
        type="date"
        id="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
      />

      <label htmlFor="start-date">Start Date</label>
      <input
        type="date"
        id="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />

      <fieldset className="address">
        <legend>Address</legend>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          value={formData.street}
          onChange={handleChange}
          required
        />

        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label htmlFor="state">State</label>
        <select
          name="state"
          id="state"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value="CA">California</option>
          <option value="NY">New York</option>
          <option value="TX">Texas</option>
        </select>

        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="number"
          id="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
      </fieldset>

      <label htmlFor="department">Department</label>
      <select
        name="department"
        id="department"
        value={formData.department}
        onChange={handleChange}
        required
      >
        <option value="sales">Sales</option>
        <option value="marketing">Marketing</option>
        <option value="engineering">Engineering</option>
        <option value="hr">Human Resources</option>
        <option value="legal">Legal</option>
      </select>

      <button type="submit">Save Employee</button>
    </form>
  );
};

export default Form;

  
  