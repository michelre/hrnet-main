import {Outlet } from "react-router-dom";

const Layout =()=>{
    return(
        <div>
            <header>
                <h1 className="title">HRnet</h1>
            </header>
            <main>
            <Outlet />
            </main>
        </div>
    );
};export default Layout;