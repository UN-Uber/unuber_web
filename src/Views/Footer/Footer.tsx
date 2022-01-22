import React from 'react'
import './Footer.css'
import PhoneAndroidSharpIcon from '@mui/icons-material/PhoneAndroidSharp';
import PhoneEnabledSharpIcon from '@mui/icons-material/PhoneEnabledSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from '../../assets/profile_iconRecurso 2.svg';
import play from '../../assets/playstore.png';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => {

    return (
        <Typography
            sx={{ display: 'flex', bgcolor: "#A6A6A6"}}
        >
            <CssBaseline />
            <Container sx={{ display: 'flex', py: 8}}>
                <Grid container spacing={4} direction="row" justifyContent="space-between" alignItems="stretch">

                    <Grid item md={3}>
                        <img id="footer-img" src={Logo} alt="Un-Uber" />
                    </Grid>

                    <Divider orientation="vertical" flexItem />
                    
                    <Grid item md={3}>
                        <Typography variant="h4" sx={{mb: 2}}>
                            Contacto
                        </Typography>

                        <Grid container spacing={4} direction="column" justifyContent="flex-start" alignItems="stretch">
                            <Grid item>
                                <Typography variant="subtitle1" sx={{verticalAlign: 'middle', display: 'inline-flex'}}>
                                    <PhoneAndroidSharpIcon sx={{mr: 2}}/>+57 315 669 8783
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" sx={{verticalAlign: 'middle', display: 'inline-flex'}}>
                                    <PhoneEnabledSharpIcon sx={{mr: 2}}/>+57 601 698 7252
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" sx={{verticalAlign: 'middle', display: 'inline-flex'}}>
                                    <EmailSharpIcon sx={{mr: 2}}/>contact@unuber.com
                                </Typography>                                
                            </Grid>                            
                        </Grid>
                    </Grid>

                    <Divider orientation="vertical" flexItem />

                    <Grid item md={2}>
                        <Typography variant="h4" sx={{mb: 4}}>
                            Redes
                        </Typography>
                        <Grid container spacing={4} direction="row" justifyContent="flex-start" alignItems="stretch">
                            <Grid item>
                                <Box component="a" href="https://www.facebook.com">
                                    <FacebookIcon sx={{color: '#000000', fontSize: 30}}/>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box component="a" href="https://www.facebook.com">
                                    <TwitterIcon sx={{color: '#000000', fontSize: 30}}/>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box component="a" href="https://www.facebook.com">
                                    <InstagramIcon sx={{color: '#000000', fontSize: 30}}/>
                                </Box>
                            </Grid>
                        </Grid>
                        <img id="play" src={play} alt="Un-Uber" />
                    </Grid>
                    
                </Grid>
            </Container>
        </Typography>
    )
};

export default Footer;
