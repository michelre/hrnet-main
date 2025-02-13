import { useContext, useState } from "react";
import { EmployeesContext } from "../../context"; 
import { Select } from "hrnet-select-p14";
import { states } from "../../data";


const Form = () => {
 
  const { employees, setEmployees } = useContext(EmployeesContext);
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [selectedState, setSelectedState] = useState(null)

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
  const handleDepartmentSelect = (department) => {
    setFormData({ ...formData, department }); //met à jour l'état sélectionné dans formData
    setSelectedDepartment(department)
  };

  // Gestion du submit du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployeesData = [...employees, formData];

    setEmployees(newEmployeesData);
    localStorage.setItem("employeesData", JSON.stringify(newEmployeesData)); 
  };
  const handleStateSelect = (state) => {
    setFormData({ ...formData, state }); //met à jour l'état sélectionné dans formData
    setSelectedState(state)
  };

  return (
    <form id="create-employee" onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
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

      <label htmlFor="dateOfBirth">Date of Birth</label>
      <input
        type="date"
        id="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
      />

      <label htmlFor="startDate">Start Date</label>
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
          <Select 
            options={states}
            onChange={handleStateSelect}
            defaultValue={selectedState}
            placeholder="Select states"
          />
        

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
        <Select             
            options={[
              {id: 'sales', value: 'Sales'},
              {id: 'marketing', value: 'Marketing'},
              {id: 'engineering', value: 'Human Resources'},
              {id: 'legal', value: 'Legal'},
            ]}
            onChange={handleDepartmentSelect}
            defaultValue={selectedDepartment}
            placeholder="Select Department"
          />

      <button type="submit">Save Employee</button>
    </form>
  );
};

export default Form;

  
  