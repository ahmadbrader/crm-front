import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import logo from 'assets/images/logo.svg'
import Sidemenu from 'config/sidemenu'
import AppContext from 'utils/AppContext';
import { FaWindowClose, FaTimes } from "react-icons/fa";

export default function SidebarMenu() {

    const context = useContext( AppContext )
    
    return (
        <aside className={`enotif-sidenav ${context.showMobileMenu ? 'in' : 'out'}`}>
            <button className='close-mobile-menu'  onClick={() => context.setShowMobileMenu(!context.showMobileMenu)}>
                <FaTimes />
            </button>

            <div className="logo-wrapper">
                {/* <img src={logo} alt="CRM" /> */}
            </div>

            <nav>
                <ul>
                    { Sidemenu.map((menu, index) => {
                        if( menu.submenu ) {
                            return (
                                <li key={`menu-${index}`} className={`has-submenu ${context.pageData.active === menu.key ? 'active' : ''}`}>
                                    <div className="parent">
                                        <span className="icon">{menu.icon.unactive}</span>
                                        <a href={menu.url}>{menu.text}</a>
                                    </div>
                                    <ul className="submenu">
                                        { menu.submenu.map((submenu, index) => {
                                            return (
                                                <li key={`submenu-${index}`}>
                                                    <Link to={submenu.url}>{submenu.text}</Link>
                                                </li>
                                            )
                                        } ) }
                                    </ul>
                                </li>
                            )
                        } else {
                            return (
                                <li key={`menu-${index}`} className={context.pageData.active === menu.key ? 'active' : ''}>
                                    <span className="icon">{menu.icon.unactive}</span>
                                    <Link to={menu.url}>{menu.text}</Link>
                                </li>
                            )
                        }
                    }) }
                </ul>

            </nav>
        </aside>
    )
}
