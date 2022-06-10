import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/nav-bar.css'

const NavBar = () => {

    const navigate = useNavigate();

    return (
        <header className='nav-bar'>
            <div className="nav-title-container" onClick={()=>navigate("/")}>
                <h4 className='nav-title'>e-commerse</h4>
            </div>
            <ul className='nav-ul'>
                <li><Link to="/login"><i className='bx bx-user'></i></Link></li>
                <li><Link to="/purchase"><i className='bx bx-purchase-tag-alt'></i></Link></li>
                <li><Link to="/cart"><i className='bx bx-cart' ></i></Link></li>
            </ul>
        </header>
    );
};

export default NavBar;