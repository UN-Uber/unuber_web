import React from 'react'
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <div>
            <div className='Footer'>
                <div className='row'>
                    <div className='col-sm-1 element'>
                        <img src="https://image.winudf.com/v2/image1/aW8uaW5iLm5ldHdvcmtfaWNvbl8xNTUzNzUzNzk3XzAxOQ/icon.png?w=170&fakeurl=1" alt="Un-Uber"/  >
                    </div>
                    <div className='col-sm-4 element'>
                        <h4 className="titulos_footer">Comunnications </h4>
                            <ul className="list-unstyled">
                                <i className="fa fa-phone fa-lg"></i> : +57 6 69 87 25<br />
                                <i className="fa fa-mobile fa-lg"></i> : +57 315 6 69 87 83<br />
                                <i className="fa fa-envelope fa-lg"></i> : petlife2@gmail.com <br/>
                            </ul>
                    </div>
                    <div className='col-sm-3 element'>
                    <h4  className="titulos_footer">Redes Sociales</h4>
                        <ul className="list-unstyled">
                            <a className="btn btn-block btn-social-icon btn-facebook" href="http://www.facebook.com"><i className="fa fa-facebook fa-lg"> PetLife Facebook</i></a> <br/>
                            <a className="btn btn-block btn-social btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter fa-lg"> PetLife Twitter</i></a> <br/>
                            <a className="btn btn-block btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube fa-lg"> PetLife Youtube</i></a> <br/>
                            <a className="btn btn-block btn-social-icon btn-instagram" href="http://instagram.com/"><i className="fa fa-instagram fa-lg"> PetLife Instagram</i></a> <br/>
                        </ul>
                    </div>
                    <div className='col-sm-3 element'>
                    <h4 className="titulos_footer">Vinculos importantes</h4>
                        <ul className="list-unstyled">
                            <i className="fa fa-paw fa-lg"><a href="http://www.proteccionanimalbogota.gov.co/transparencia/tramites-servicios/adopciones-animales-compa%C3%B1%C3%ADa" className="links">   Protección animal</a></i><br/>
                            <i className="fa fa-paw fa-lg"><a href="https://www.puppis.com.co/adopcion" className="links">   Puppies</a></i><br/>
                            <i className="fa fa-paw fa-lg"><a href="https://www.adopcionesbogota.com/" className="links">   Adopciones en Bogotá</a></i><br/>
                            <i className="fa fa-paw fa-lg"><a href="https://www.adoptanocompres.org/" className="links">   Adopta no compres</a></i><br/>
                            <i className="fa fa-paw fa-lg"><a href="https://huellitas.social/" className="links">   Huellitas sin hogar</a></i><br/>
                        </ul>
                    </div>
                </div>
            </div>
            <br/>
            <div className="justify-content-center rigths off">
                <h4 className="rig"> © Un-UBER 2022, All reserved rigths</h4>
            </div>
        </div>
    )
};

export default Footer;
