import { useState } from "react";
const Form = () => {

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
  }

  // Gestion du submit du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("employeeData", JSON.stringify(formData));
    console.log(formData);
  }
  
    return (
      <>
        <form id="create-employee" onSubmit={handleSubmit}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />
  
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" value={formData.lastName} onChange={handleChange}/>
  
          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <label htmlFor="start-date">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
  
          <fieldset className="address">
            <legend>Address</legend>
  
            <label htmlFor="street">Street</label>
            <input id="street" type="text" value={formData.street} onChange={handleChange}/>
  
            <label htmlFor="city">City</label>
            <input id="city" type="text" value={formData.city} onChange={handleChange}/>
  
            <label htmlFor="state">State</label>
          <select name="state" id="state" value={formData.state} onChange={handleChange}>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
          </select>
  
            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" value={formData.zipCode} onChange={handleChange}/>
          </fieldset>
  
          <label htmlFor="department">Department</label>
          <select name="department" id="department" value={formData.department} onChange={handleChange}>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="engineering">Engineering</option>
            <option value="hr">Human Resources</option>
            <option value="legal">Legal</option>
          </select>

          <button type="submit">Save Employee</button>
        </form>
       
      </>
    );
  };

  export default Form;
  