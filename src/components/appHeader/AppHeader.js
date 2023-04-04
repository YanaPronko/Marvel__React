import { Link, NavLink} from "react-router-dom";
import './appHeader.scss';

const AppHeader = () => {
  const path = window.location.pathname === '/' ? "main page" : window.location.pathname.slice(1);
    return (<>
      <header className="app__header">
        {<h2>Now on the {path}</h2>}
        
        <h1 className="app__title">
          <Link to="/">
            <span>Marvel</span> information portal
          </Link>
        </h1>
        <nav className="app__menu">
          <ul>
            <li>
              <NavLink
                end
                style={({ isActive }) => ({
                  color: isActive ? "#9F0013" : "#000000",
                })}
                to="/"
              >
                Characters
              </NavLink>
            </li>
            /
            <li>
              <NavLink
                end
                style={({ isActive }) => ({
                  color: isActive ? "#9F0013" : "#000000",
                })}
                to="/comics"
              >
                Comics
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default AppHeader;