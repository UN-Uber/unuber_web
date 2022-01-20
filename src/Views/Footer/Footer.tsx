import React from 'react'
import './footer.css';
import PhoneAndroidSharpIcon from '@mui/icons-material/PhoneAndroidSharp';
import PhoneEnabledSharpIcon from '@mui/icons-material/PhoneEnabledSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from '../../assets/profile_iconRecurso 2.svg';
import play from '../../assets/playstore.png';

const Footer: React.FC = () => {

    return (
        <div>
            <div className="footer" >
                
                <img id="img" src={Logo} alt="Un-Uber" />
                
                <div className='col-sm-4 element'>
                    <h4 className="titulos_footer" >Comunnications </h4>
                    <ul className="list-unstyled">
                        <PhoneAndroidSharpIcon/> : +57 6 69 87 25<br />
                        <PhoneEnabledSharpIcon/> : +57 315 6 69 87 83<br />
                        <EmailSharpIcon/> : communications@unber.com <br/>
                    </ul>
                    <img id="play" src={play} alt="Un-Uber" />
                </div>

                <div className='col-sm-3 element'>
                    <h4 className="titulos_footer">Web Pages you may like</h4>
                    <ul className="list-unstyled">
                        <i className="fa fa-paw fa-lg"><a href="https://www.uber.com/co/es/" className="links">  Uber</a></i><br/>
                        <i className="fa fa-paw fa-lg"><a href="https://cabify.com/es" className="links">  Cabify</a></i><br/>
                        <i className="fa fa-paw fa-lg"><a href="https://thebeat.co/co/blog/tag/beat-colombia/" className="links">  Beat</a></i><br/>
                        <i className="fa fa-paw fa-lg"><a href="https://colombia.didiglobal.com/" className="links">  DiDi</a></i><br/>
                    </ul>
                </div>

                <div className='col-sm-3 element'>
                <h4  className="titulos_footer" >Social media</h4>
                    <ul className="list-unstyled list-unstyled2">
                        <a className="btn btn-block" href="http://www.facebook.com"><FacebookIcon/> Un-Uber Facebook </a> <br/>
                        <a className="btn btn-block " href="http://twitter.com/"><TwitterIcon/> Un-Uber Twitter </a> <br/>
                        <a className="btn btn-block " href="http://youtube.com/"><YouTubeIcon/> Un-Uber Youtube</a> <br/>
                        <a className="btn btn-block " href="http://instagram.com/"><InstagramIcon/> Un-Uber Instagram</a> <br/>
                    </ul>
                </div>

            </div>
            <div className="justify-content-center rigths off">
                <h4 className="rig"> © Un-UBER 2022, All rigths reserved </h4>
            </div>
        </div>
    )
};

export default Footer;
