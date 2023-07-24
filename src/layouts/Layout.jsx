import { NavLink } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      <div className="p-2 bg-success text-white text-center">
        <h1>Assignment On Module 08</h1>
        <h4>Simple React Web Application</h4>
      </div>
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/income/" className="nav-link">
                Income
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/expences/" className="nav-link">
                Expences
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-5">{props.children}</div>

      <div className="mt-5 p-4 bg-primary text-white text-center">
        <p>Dew Hunt</p>
      </div>
    </>
  );
};

export default Layout;
