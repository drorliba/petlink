import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/joy';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid, IconButton, Alert } from '@mui/material';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import * as Yup from 'yup';

import { AuthContext } from '../context/AuthContext';

const SignupLoginModal = ({ dialogOpen, setDialogOpen, dialogType }) => {
    // Accessing authentication context
    const { setToken } = useContext(AuthContext);

    // State for error handling
    const [error, setError] = useState('');

    // Resolve the path to the homepage
    const pathToHome = useResolvedPath('/homepage');
    const navigate = useNavigate();

    // Formik instance for login form
    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Required'),
            email: Yup.string()
                .email('Not a valid email')
                .required('Required')
        }),
        onSubmit: async (values) => {
            try {
                // Attempt to log in using API
                const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, { email: values.email, password: values.password });
                setToken(res.data.token);
                localStorage.setItem('token', res.data.token);
                setDialogOpen(false);
                navigate(pathToHome);
            } catch (err) {
                // Handle login error
                setError(err.response.data);
                console.log(err);
            }
        }
    });

    // Formik instance for signup form
    const signupFormik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            password: '',
            rePassword: ''
        },
        // Validation rules for sign-up fields
        validationSchema: Yup.object({
            first_name: Yup.string()
                .max(15, 'Too long')
                .required('Required'),
            last_name: Yup.string()
                .max(15, 'Too long')
                .required('Required'),
            email: Yup.string()
                .email('Not valid')
                .max(30, 'Too long')
                .required('Required'),
            phone_number: Yup.string()
                .max(15, 'Too long')
                .required('Required'),
            password: Yup.string()
                .max(15, 'Too long')
                .min(4, 'Too short')
                .required('Required'),
            rePassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Must match password')
                .required('Required')
        }),
        onSubmit: async (values) => {
            try {
                // Attempt to sign up using API
                const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup`, values);
                if (res.data.ok) {
                    navigate('/homepage');
                }
            } catch (err) {
                // Handle sign-up error
                setError(true);
                console.log(err);
            }
        }
    });

    const closeModal = (e) => {
        setError('');
        setDialogOpen(false);
    };

    return (
        <Dialog open={dialogOpen} onClose={closeModal}>

            {/* Sign-up dialog */}
            {(dialogType === 'signup') && <>
                <DialogTitle as="div">
                    <h2>Sign Up</h2>
                    <IconButton
                        onClick={closeModal}
                        sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    {/* Sign-up form fields */}
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {/* Fields and validation for sign-up form */}
                        <Grid item md={6}>
                            <TextField
                                required
                                label="First name"
                                name="first_name"
                                variant="outlined"
                                color="success"
                                fullWidth
                                value={signupFormik.values.first_name}
                                onChange={signupFormik.handleChange}
                                error={signupFormik.touched.first_name && !!signupFormik.errors.first_name}
                                helperText={(signupFormik.touched.first_name && !!signupFormik.errors.first_name) && signupFormik.errors.first_name}
                            />
                        </Grid>

                        <Grid item md={6}>
                            <TextField
                                required
                                label="Last name"
                                name="last_name"
                                value={signupFormik.values.last_name}
                                variant="outlined"
                                color="success"
                                fullWidth
                                onChange={signupFormik.handleChange}
                                error={signupFormik.touched.last_name && !!signupFormik.errors.last_name}
                                helperText={(signupFormik.touched.last_name && !!signupFormik.errors.last_name) && signupFormik.errors.last_name}
                            />
                        </Grid>

                        <Grid item md={12}>
                            <TextField
                                required
                                label="Email"
                                name="email"
                                variant="outlined"
                                color="success"
                                fullWidth
                                value={signupFormik.values.email}
                                onChange={signupFormik.handleChange}
                                error={signupFormik.touched.email && !!signupFormik.errors.email}
                                helperText={(signupFormik.touched.email && !!signupFormik.errors.email) && signupFormik.errors.email}
                            />
                        </Grid>

                        <Grid item md={12}>
                            <TextField
                                required
                                label="Mobile number"
                                name="phone_number"
                                value={signupFormik.values.phone_number}
                                variant="outlined"
                                color="success"
                                fullWidth
                                onChange={signupFormik.handleChange}
                                error={signupFormik.touched.phone_number && !!signupFormik.errors.phone_number}
                                helperText={(signupFormik.touched.phone_number && !!signupFormik.errors.phone_number) && signupFormik.errors.phone_number}
                            />
                        </Grid>

                        <Grid item md={12}>
                            <TextField
                                required
                                label="New password"
                                name="password"
                                type="password"
                                variant="outlined"
                                color="success"
                                fullWidth
                                value={signupFormik.values.password}
                                onChange={signupFormik.handleChange}
                                error={signupFormik.touched.password && !!signupFormik.errors.password}
                                helperText={(signupFormik.touched.password && !!signupFormik.errors.password) && signupFormik.errors.password}
                            />
                        </Grid>

                        <Grid item md={12}>
                            <TextField
                                required
                                label="Confirm password"
                                name="rePassword"
                                type="password"
                                variant="outlined"
                                color="success"
                                fullWidth
                                value={signupFormik.values.rePassword}
                                onChange={signupFormik.handleChange}
                                error={signupFormik.touched.rePassword && !!signupFormik.errors.rePassword}
                                helperText={(signupFormik.touched.rePassword && !!signupFormik.errors.rePassword) && signupFormik.errors.rePassword}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>

                {/* Sign-up form submission button */}
                <DialogActions className="dialogActions">
                    <Button onClick={signupFormik.handleSubmit} color="success">Sign Up</Button>
                </DialogActions>
            </>}

            {/* Login dialog */}
            {(dialogType === 'login') && <>
                <DialogTitle as="div">
                    <IconButton
                        onClick={closeModal}
                        sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                    <h2>Log In</h2>
                </DialogTitle>

                <DialogContent>
                    {/* Login form fields */}
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {/* Fields and validation for login form */}
                        <Grid item md={12}>
                            <TextField
                                name="email"
                                id="email"
                                label="Email"
                                variant="outlined"
                                color="success"
                                fullWidth
                                value={loginFormik.values.email}
                                onChange={loginFormik.handleChange}
                                error={loginFormik.touched.email && !!loginFormik.errors.email}
                                helperText={(loginFormik.touched.email && !!loginFormik.errors.email) && loginFormik.errors.email}
                            />
                        </Grid>

                        <Grid item md={12}>
                            <TextField
                                name="password"
                                id="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                color="success"
                                fullWidth
                                value={loginFormik.values.password}
                                onChange={loginFormik.handleChange}
                                error={loginFormik.touched.password && !!loginFormik.errors.password}
                                helperText={(loginFormik.touched.password && !!loginFormik.errors.password) && loginFormik.errors.password} />
                        </Grid>
                    </Grid>

                </DialogContent>
                {/* Login form submission button */}
                <DialogActions>
                    <Button color="success" onClick={loginFormik.handleSubmit}>Log In</Button>
                </DialogActions>
            </>}

            {/* Display error message if there is one */}
            {error && <Alert severity="error">{error}</Alert>}

        </Dialog >
    );
};

export default SignupLoginModal;