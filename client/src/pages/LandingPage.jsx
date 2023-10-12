import React, { useState, useEffect, useContext } from 'react';
import { Button, Divider } from '@mui/joy';
import { Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useResolvedPath } from 'react-router-dom';

import '../css/LandingPage.css';
import { AuthContext } from '../context/AuthContext';
import SignupLoginModal from '../components/SignupLoginModal';

const LandingPage = () => {
    const { loggedinUser } = useContext(AuthContext);
    // State to manage the dialog type (signup or login) and dialog visibility
    const [dialogType, setDialogType] = useState('signup');
    const [dialogOpen, setDialogOpen] = useState(false);

    const pathToSearch = useResolvedPath('/search');
    const pathToHomepage = useResolvedPath('/homepage');
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedinUser) {
            navigate(pathToHomepage);
        }
    }, [loggedinUser]);

    return (
        <div className="landingPage">
            {/* Chip for searching pets */}
            <Chip
                className="searchChip"
                icon={<SearchIcon sx={{ 'fontSize': '1.5rem' }} />}
                label="search pets"
                variant="outlined"
                onClick={e => navigate(pathToSearch)}
                sx={{
                    'fontSize': '1rem',
                    "fontFamily": "'Inter', sans-serif",
                    'fontWeight': '500',
                    'padding': '1rem',
                    color: '#bdbdbd'
                }}
            />

            <div className="content-wrapper">
                <div className="branding">
                    <h1><span className="logo-bold">pet</span>link</h1>
                    <p>The place to find your next best friend</p>
                </div>

                {/* Buttons for Sign Up and Log In */}
                <div className="buttons-div">
                    <Button
                        className='welcomeButton'
                        variant="soft"
                        size="lg"
                        color="success"
                        onClick={e => {
                            setDialogType('signup');
                            setDialogOpen(true);
                        }}
                    >
                        Sign Up
                    </Button>
                    <Divider className='or-divider'>or</Divider>
                    <Button
                        className='welcomeButton'
                        variant="solid"
                        size="lg"
                        color="success"
                        onClick={e => {
                            setDialogType('login');
                            setDialogOpen(true);
                        }}
                    >
                        Log In
                    </Button>
                </div>
            </div>

            {/* Modal for Sign Up and Log In */}
            <SignupLoginModal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} dialogType={dialogType} />

        </div>
    );
};

export default LandingPage;
