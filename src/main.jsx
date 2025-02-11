import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './components/Layout/Layout'
import Home from './pages/home/Home'
import './index.css'
import './context.js'


import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import EmployeesList from './pages/employees/EmployeesList'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<EmployeesList />} />
    </Route>
  )
);
createRoot(document.getElementById('root')).render(  
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

