import {NavLink, Outlet} from 'react-router-dom';

function NavBar(){

    return(
       <div>
            <div className='navbar-fixed'> 
                <nav className='cyan darken-3'>
                    <div className="nav-wrapper">
                    <a href="#" className="brand-logo right">Logo</a>
                        <ul className="hide-on-med-and-down">
                            <li id="topics_open"><NavLink to="topics/open">Open</NavLink></li>
                            <li id="topics_closed"><NavLink to="topics/closed">Closed</NavLink></li>
                        </ul>
                        </div>
                    </nav>
            </div>
            <div className='container'>
                <Outlet/>
            </div>
            
        </div>
    )
}
export default NavBar;