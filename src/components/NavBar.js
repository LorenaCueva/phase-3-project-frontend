import {NavLink, Outlet} from 'react-router-dom';

function NavBar({user}){

    return(
       <div>
            <div className='navbar-fixed'> 
                <nav className='cyan darken-3'>
                    <div className="nav-wrapper">
                        <div  className="brand-logo right">Logo</div>
                        <div id="username" className="brand-logo center-align">{user? <NavLink to="user">{user.name}</NavLink> : null}</div>
                        <ul className="hide-on-med-and-down">
                            <li id="topics_open"><NavLink to="/">LogIn</NavLink></li>
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