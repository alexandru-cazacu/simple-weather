import * as React from 'react';
import { NavLink } from 'react-router-dom';

export class Navbar extends React.Component<any, any> {
    render() {
        return (
            <nav className="navbar">
                <div className="wrapper">
                    <h2 className="logo">Alex Cazacu</h2>
                    <div className="burger"></div>
                    <div className="list">
                        <NavLink className="item" exact activeClassName='active' to='/'>
                            Home
                            </NavLink>
                        <NavLink className="item" activeClassName='active' to='/portfolio'>
                            Portfolio
                        </NavLink>
                        <NavLink className="item" activeClassName='active' to='/blog'>
                            Blog
                            </NavLink>
                        <NavLink className="item" activeClassName='active' to='/tool'>
                            Tool
                        </NavLink>
                    </div>
                </div>
            </nav>


        );
    }
}

/* <a href="index.php"><h2 className="main-logo">Alex Cazacu</h2></a>
<div id="burger-nav"></div>
<nav>
  <ul>
      <li>
          <NavLink exact activeClassName='active' to='/'>
              Home
          </NavLink>
      </li>
      <li>
          <NavLink activeClassName='active' to='/portfolio'>
              Portfolio
          </NavLink>
      </li>
      <li>
          <NavLink activeClassName='active' to='/blog'>
              Blog
          </NavLink>
      </li>
      <li>
      </li>
  </ul >
</nav > */