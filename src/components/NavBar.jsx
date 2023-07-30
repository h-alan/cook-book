import React from 'react'
import { Link } from 'react-router-dom'
import NavBarData from './NavBarData'
import { useState } from 'react';

function NavBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(sidebar);

  return (
    <><div className="navbar">
      <Link to='cook-book'>

      </Link>
    </div><nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to='/'>
              HELP?
            </Link>
          </li>
          {NavBarData.map((item, index) => {
            <li key={index} className={item.cname}>
              <Link to={item.path}>
                <span>{item.title}</span>
              </Link>
            </li>;
          })}
        </ul>
      </nav></>
  )
}

export default NavBar