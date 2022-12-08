import {NavLink, Outlet} from 'react-router-dom';

function NavBar({user}){

    return(
       <div>
            <div className='navbar-fixed'> 
                <nav className='cyan darken-3'>
                    <div className="nav-wrapper">
                        <div  className="brand-logo right">Brainstormy</div>
                        <ul className="hide-on-med-and-down">
                            <li id="topics_open"><NavLink to="/">LogIn</NavLink></li>
                            <li id="topics_open"><NavLink to="topics/open">Open Topics</NavLink></li>
                            <li id="topics_closed"><NavLink to="topics/closed">Closed Topics</NavLink></li>
                            <li id="username" >{user? <NavLink to="user">My Ideas</NavLink> : null}</li>
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