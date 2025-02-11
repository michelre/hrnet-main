import {Outlet } from "react-router-dom";
import { useState } from 'react';
import {EmployeesContext} from '../../context.js'

const Layout =()=> {
    const employeeData = JSON.parse(localStorage.getItem('employeesData') || '[]')
    const [employees, setEmployees] = useState(employeeData)
    return(
        <EmployeesContext.Provider value={{employees, setEmployees}}>
            <div>
                <header>
                    <h1 className="title">HRnet</h1>
                </header>
                <main>
                <Outlet />
                </main>
            </div>
        </EmployeesContext.Provider>        
    );
};
export default Layout;
