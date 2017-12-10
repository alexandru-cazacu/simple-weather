import * as React from 'react';
import { NavLink } from 'react-router-dom';

export class Footer extends React.Component<any, any> {
    render() {
        return (
            <footer>
                <div className="wrapper">
                    <ul>
                        <h1 className="logo">Alex<br />Cazacu</h1>
                    </ul>
                    <ul>
                        <li><h3>Naviga</h3></li>
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
                            <NavLink activeClassName='active' to='/tool'>
                                Tool
                            </NavLink>
                        </li>
                    </ul>
                    <ul>
                        <li><h3>Categorie</h3></li>
                    </ul>
                    <ul>
                        <li><h3>Ultimi post</h3></li>
                    </ul>
                    <nav>
                        <ul>
                            <li>
                                <a href="http://github.com/alexandru-cazacu" target="_blank">
                                    <img src="images/github-logo.png" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="http://twitter.com/The_Cazacu" target="_blank">
                                    <img src="images/twitter-logo.png" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="http://facebook.com">
                                    <img src="images/facebook-logo.png" alt="" />
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="bottom">
                        <div><p>&copy; 2017 Alexandru Cazacu</p></div>
                    </div>
                </div>
            </footer>
        );
    }
}