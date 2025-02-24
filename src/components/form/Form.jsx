import { useContext, useState } from "react";
import { EmployeesContext } from "../../context"; 
import { Select } from "hrnet-select-p14";
import { states } from "../../data";

import Modal from "../modal/Modal";
import { createPortal } from "react-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from 'date-fns/locale/fr';



const Form = () => {
 
  const { employees, setEmployees } = useContext(EmployeesContext);
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    startDate: new Date(),
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
    console.log(formData);
    setShowModal(true)
  };

  // Gestion du select des états & départements 
  const handleStateSelect = (state) => {
    setFormData({ ...formData, state }); 
   
    setSelectedState(state)
  };
  const handleDepartmentSelect = (department) => {
    setFormData({ ...formData, department }); 
    setSelectedDepartment(department)
  };

  

  return (
    <>

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
      <DatePicker
      id="dateOfBirth"
      selected={formData.dateOfBirth}
      onSelect={(value) => handleChange({target: {id: 'dateOfBirth', value}})}
      onChange={(value) => handleChange({target: {id: 'dateOfBirth', value}})}
      locale={fr}
      dateFormat={'dd/MM/yyyy'}
      required
      />
     

      <label htmlFor="startDate">Start Date</label>
      <DatePicker 
      id="startDate"
      selected={formData.startDate}
      onSelect={(value) => handleChange({target: {id: 'startDate', value}})}
      onChange={(value) => handleChange({target: {id: 'startDate', value}})}
      locale={fr}
      dateFormat={'dd/MM/yyyy'}
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
                    required
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
            required
          />

    <button type="submit">Save</button>
    {(showModal) ? createPortal(<Modal handleCloseClick={() => setShowModal(false)}/>, document.body) : ''}
    </form>
    </>
  );
};

export default Form;

  
  