import React from "react";
import Logo from '../../assets/profile_iconRecurso 5.svg';
import im1 from '../../assets/a.png';
import im2 from '../../assets/a.png';
import im3 from '../../assets/a.png';
import im4 from '../../assets/a.png';

import { Button, Container, Image } from 'react-bootstrap';

const Menu: React.FC = () => {

  return (
  	<header id="header">
      <div id="contenedor">
        
        <ul className="nav" id="principal">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
            
          {/*Modificacion para el tocken*/}
            <ul id="opciones" className="no-visible">
              <li id="enlaces">
                <div id="imagen"><img src={im1} /></div>
                <a href="/">Inicio</a>
              </li>
              <li id="enlaces">
                <div id="imagen"><img src={im2} /></div>
                <a href="/addUser">Registro</a>
              </li>
             {/* <li id="enlaces">
                <div id="imagen"><img src={im3} /></div>
                <a href="/viewData">Usuario</a>
              </li>*/}
              <li id="enlaces">
                <div id="imagen"><img src={im4} /></div>
                <a href="/login">Login</a>
              </li>
             </ul>
             {/**/}

          </li>
        </ul>
       
        <div id="imagenes"><img src={Logo} /></div>
      </div>
    </header>



  )
}

export default Menu