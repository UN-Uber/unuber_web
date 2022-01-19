import React from 'react'
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <div>
            <div className='p-5 text-center bg-light'>
            <h1 className="mb-3">UN-UBER</h1>
            <h4 className="mb-3">Moving things</h4>
            </div>
            <header>
                <nav className='navbar navbar-expand-lg navbar-light bg-white fixed-top'>
                    <div className='container-fluid'>
                        <div className='collapse navbar-collapse' id='navigationHeader'>
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className='nav-item active'>
                                    <Link className='nav-link' to={'/home'}> Home </Link>
                                </li>
                                <li className='nav-item active'>
                                    <Link className='nav-link' to={'/login'}> Login </Link>
                                </li>
                                <li className='nav-item active'>
                                    <Link className='nav-link' to={'/addUser'} > Register </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header;