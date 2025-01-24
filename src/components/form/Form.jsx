import { useState, useContext } from "react";
import { states } from "../../data";
import { Select } from "select-p14-elodie";




const Form = () => {
  const {employees, setEmployees} = useContext(EmployeesContext)
// initialiser du state du formulaire avec des valeurs par défaut
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    zipCode: "",
    department: "",
  });

    // fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { id, value } = e.target; 
    setFormData({ ...formData, [id]: value }); 
  };

  const onChangeSelect = (value) => {
    console.log(value)
  }
 // Gerer la soumission du formulaire
 const handleSubmit = (e) => {
  e.preventDefault();  
  const employeesData = JSON.parse(localStorage.getItem('employeesData') || '[]')
  const newEmployeesData = employeesData.concat(formData)
  setEmployees(newEmployeesData)
  localStorage.setItem("employeesData", JSON.stringify(newEmployeesData));
  console.log("Form submitted", formData);
};

  const [selectedState, setSelectedState] = useState(null)
 // fonction pour gérer la sélection d'un état dans la liste déroulante
  const handleStateSelect = (state) => {
    setFormData({ ...formData, state }); //met à jour l'état sélectionné dans formData
    setSelectedState(state)
  };

    return (
      <>
        <form id="create-employee" onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <input type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />

        <label htmlFor="start-date">Start Date</label>
        <input type="date" id="startDate" value={formData.startDate} onChange={handleChange} />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input type="text" id="street" value={formData.street} onChange={handleChange} />

          <label htmlFor="city">City</label>
          <input type="text" id="city" value={formData.city} onChange={handleChange} />

          <label htmlFor="state">State</label>
          <Select 
            options={states}
            onChange={handleStateSelect}
            defaultValue={selectedState}
            placeholder="Select states"
          />
          
          <label htmlFor="zip-code">Zip Code</label>
          <input type="number" id="zipCode" value={formData.zipCode} onChange={handleChange} />
        </fieldset>

        <label htmlFor="department">Department</label>
        <Select 
            placeholder="Select Department"
            options={[
              {id: 'sales', name: 'Sales'},
              {id: 'marketing', name: 'Marketing'},
            ]}
            onChange={onChangeSelect}
          />
        <select id="department" value={formData.department} onChange={handleChange}>
          <option value="">Select Department</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="engineering">Engineering</option>
          <option value="hr">Human Resources</option>
          <option value="legal">Legal</option>
        </select>

        <button type="submit">Save</button>
      </form>
      </>
    );
  };

  export default Form;
  