import { useState, useContext } from "react";
import { states } from "../../data";
import { Select } from "select-p14-elodie";
import { EmployeesContext } from "../../context";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from 'date-fns/locale/fr';
import Modal from "../modal/Modal";
import { createPortal } from "react-dom";




const Form = () => {
  const {employees, setEmployees} = useContext(EmployeesContext)
  const [selectedState, setSelectedState] = useState(null)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [showModal, setShowModal] = useState(false)
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

  const handleDepartmentSelect = (department) => {
    setFormData({ ...formData, department }); //met à jour l'état sélectionné dans formData
    setSelectedDepartment(department)
  };

 // Gerer la soumission du formulaire
 const handleSubmit = (e) => {
  e.preventDefault();  
  const employeesData = JSON.parse(localStorage.getItem('employeesData') || '[]')
  const newEmployeesData = employeesData.concat(formData)
  setEmployees(newEmployeesData)
  localStorage.setItem("employeesData", JSON.stringify(newEmployeesData));
  setShowModal(true)
};
  
 // fonction pour gérer la sélection d'un état dans la liste déroulante
  const handleStateSelect = (state) => {
    setFormData({ ...formData, state }); //met à jour l'état sélectionné dans formData
    setSelectedState(state)
  };

    return (
      <>
        <form id="create-employee" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <DatePicker
          id="dateOfBirth"
          selected={formData.dateOfBirth}
          onSelect={(value) => handleChange({target: {id: 'dateOfBirth', value}})}
          onChange={(value) => handleChange({target: {id: 'dateOfBirth', value}})}
          locale={fr}
          dateFormat={'dd/MM/yyyy'}          
        />

        <label htmlFor="startDate">Start Date</label>
        <DatePicker
          id="startDate" 
          selected={formData.startDate}
          onSelect={(value) => handleChange({target: {id: 'startDate', value}})}
          onChange={(value) => handleChange({target: {id: 'startDate', value}})}
          locale={fr}
          dateFormat={'dd/MM/yyyy'}          
        />

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

        <button type="submit">Save</button>
        {(showModal) ? createPortal(<Modal handleCloseClick={() => setShowModal(false)}/>, document.body) : ''}
      </form>
      </>
    );
  };

  export default Form;
  