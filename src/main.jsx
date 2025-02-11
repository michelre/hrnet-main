import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './context.js'
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import EmployeesList from "./pages/employees/EmployeesList";
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./index.css";

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

