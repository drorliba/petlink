import React, { useState, useContext } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Chip, Toolbar, Typography, Menu, Button, MenuItem } from '@mui/material';
import { useNavigate, useResolvedPath, NavLink } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import SignupLoginModal from '../components/SignupLoginModal';
import '../css/MenuBar.css';

const MenuBar = () => {
    const { loggedinUser, logout } = useContext(AuthContext);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const navigate = useNavigate();
    const pathToLanding = useResolvedPath('/');
    const pathToHome = useResolvedPath('/homepage');
    const pathToSearch = useResolvedPath('/search');
    const pathToAddPet = useResolvedPath('/addpet');
    const pathToMyPets = useResolvedPath('/mypets');
    const pathToProfileSettings = useResolvedPath('/profilesettings');
    const pathToDashboard = useResolvedPath('/dashboard');


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogoutButton = (e) => {
        logout();
        navigate(pathToLanding);
    };

    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="success" position="static">
                <Toolbar>

                    <Typography
                        as={NavLink}
                        to={pathToHome}
                        variant="h2"
                        noWrap
                        component="a"
                        sx={{
                            fontFamily: 'Josefin Sans',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        pet
                    </Typography>
                    <Typography
                        as={NavLink}
                        to={pathToHome}
                        variant="h2"
                        noWrap
                        component="a"
                        href="homepage"
                        sx={{
                            mr: 2,
                            fontFamily: 'Josefin Sans',
                            fontWeight: 300,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        link
                    </Typography>

                    <Chip className="search-chip"
                        icon={<SearchIcon
                            sx={{ 'fontSize': '1.5rem' }}
                        />}
                        label="Search..."
                        color="success"
                        onClick={e => navigate(pathToSearch)}
                        sx={{
                            'fontSize': '1rem',
                            "fontFamily": "'Inter', sans-serif",
                            color: 'white'
                        }} />

                    <Box className="menu-user-box" sx={{ flexGrow: 0 }}>
                        {loggedinUser ? (<><Button
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleOpenUserMenu}
                            endIcon={<AccountCircle />}
                        >
                            <Typography sx={{ 'fontFamily': 'inter', textTransform: "none" }}>
                                {`Hello, ` + loggedinUser.first_name}
                            </Typography>
                        </Button>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                disableAutoFocusItem
                            >

                                <MenuItem onClick={e => navigate(pathToMyPets)}>
                                    <Typography textAlign="center">My Pets</Typography>
                                </MenuItem>
                                <MenuItem onClick={e => navigate(pathToProfileSettings)}>
                                    <Typography textAlign="center">Profile Settings</Typography>
                                </MenuItem>

                                {loggedinUser.is_admin === 1 &&

                                    <MenuItem onClick={e => navigate(pathToAddPet)}>
                                        <Typography textAlign="center">Add a pet</Typography>
                                    </MenuItem>
                                }

                                {loggedinUser.is_admin === 1 &&
                                    <MenuItem onClick={e => navigate(pathToDashboard)}>
                                        <Typography textAlign="center">Admin Dashboard</Typography>
                                    </MenuItem>
                                }

                                <MenuItem onClick={handleLogoutButton}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>

                            </Menu>
                        </>) :
                            (<Button
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={e => setDialogOpen(true)}
                            >
                                <Typography sx={{ 'fontFamily': 'inter', textTransform: "none" }}>
                                    Log In
                                </Typography>
                            </Button>)}

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>

        <SignupLoginModal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} dialogType={'login'} />
    </>);
}
export default MenuBar;