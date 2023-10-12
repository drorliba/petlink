import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Stack, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputAdornment, Alert, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { PetContext } from '../context/PetContext';
import MenuBar from '../components/MenuBar';

const EditPet = () => {
    const { id } = useParams();
    const { getPet } = useContext(PetContext);


    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showError, setShowError] = useState(false);


    const defaultPetInfo = {
        petId: '',
        type: 'dog',
        name: '',
        breed: '',
        color: '',
        weight: '',
        height: '',
        hypoallergenic: '0',
        dietary: '',
        bio: ''
    };
    const [petInfo, setPetInfo] = useState(defaultPetInfo);

    const formik = useFormik({
        initialValues: {
            type: 'dog',
            name: '',
            breed: '',
            color: '',
            weight: '',
            height: '',
            hypoallergenic: '0',
            dietary: '',
            bio: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Too short')
                .max(15, 'Too long')
                .required("Can't remain empty"),
            breed: Yup.string()
                .min(2, 'Too short')
                .max(15, 'Too long')
                .required("Can't remain empty"),
            color: Yup.string()
                .min(2, 'Too short')
                .max(15, 'Too long')
                .required("Can't remain empty"),
            weight: Yup.number()
                .positive('Must be a positive number')
                .max(100, "That doesn't make sense")
                .required("Can't remain empty"),
            height: Yup.number()
                .positive('Must be a positive number')
                .max(100, "That doesn't make sense")
                .required("Can't remain empty"),
            dietary: Yup.string()
                .max(100, 'Too long'),
            bio: Yup.string()
                .max(100, 'Too long')
        }),
        onSubmit: async (values) => {
            console.log(values);
            try {
                const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/pets/`, values);
                if (res.data.ok) {
                    setShowError(false);
                    setShowSuccessAlert(true);
                }
            } catch (err) {
                setShowError(true);
                console.log(err);
            }
        }
    });

    const loadPet = async (petId) => {
        try {
            const currentPet = await getPet(petId);
            setPetInfo(currentPet);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadPet(id);
    }, []);

    useEffect(() => {
        if (!petInfo) return;
        formik.setValues(petInfo);
    }, [petInfo]);

    return petInfo && (<>
        <MenuBar />

        <div className="page-wrapp">
            <div className="content-wrap">
                <h1>Edit Pet</h1>
                <Stack className="form-stack" spacing={2}>
                    <FormControl>
                        <FormLabel>Kind</FormLabel>
                        <RadioGroup
                            id="type"
                            name="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value="dog" control={<Radio />} label="&#128054; Dog" />
                            <FormControlLabel value="cat" control={<Radio />} label="&#128049; Cat" />
                        </RadioGroup>
                    </FormControl>

                    <TextField name="name" label="Name" variant="outlined" required
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && !!formik.errors.name}
                        helperText={(formik.touched.name && !!formik.errors.name) && formik.errors.name} />

                    <TextField name="breed" label="Breed" variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.breed}
                        error={formik.touched.breed && !!formik.errors.breed}
                        helperText={(formik.touched.breed && !!formik.errors.breed) && formik.errors.breed} />

                    <TextField name="color" label="Color" variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.color}
                        error={formik.touched.color && !!formik.errors.color}
                        helperText={(formik.touched.color && !!formik.errors.color) && formik.errors.color} />

                    <TextField
                        name="weight"
                        label="Weight"
                        id="weight"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>
                        }}
                        onChange={formik.handleChange}
                        value={formik.values.weight}
                        error={formik.touched.weight && !!formik.errors.weight}
                        helperText={(formik.touched.weight && !!formik.errors.weight) && formik.errors.weight}
                    />

                    <TextField
                        name="height"
                        label="height"
                        id="height"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>
                        }}
                        onChange={formik.handleChange}
                        value={formik.values.height}
                        error={formik.touched.height && !!formik.errors.height}
                        helperText={(formik.touched.height && !!formik.errors.height) && formik.errors.height}
                    />

                    <FormControl>
                        <FormLabel>Hypoallergenic</FormLabel>
                        <RadioGroup
                            name="hypoallergenic"
                            id="hypoallergenic"
                            value={formik.values.hypoallergenic}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                            <FormControlLabel value="1" control={<Radio />} label="Yes" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        name="dietary"
                        id="dietary"
                        label="Dietary restrictions"
                        multiline
                        rows={2}
                        onChange={formik.handleChange}
                        value={formik.values.dietary}
                        error={formik.touched.dietary && !!formik.errors.dietary}
                        helperText={(formik.touched.dietary && !!formik.errors.dietary) && formik.errors.dietary}
                    />

                    <TextField
                        name="bio"
                        id="bio"
                        label="Short bio"
                        multiline
                        rows={3}
                        onChange={formik.handleChange}
                        value={formik.values.bio}
                        error={formik.touched.bio && !!formik.errors.bio}
                        helperText={(formik.touched.bio && !!formik.errors.bio) && formik.errors.bio}
                    />

                    <Button variant="contained" color="success" onClick={formik.handleSubmit}>Save Changes</Button>

                    {showSuccessAlert &&
                        <Alert
                            severity="success"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setShowSuccessAlert(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }>
                            Personal information updated successfuly
                        </Alert>
                    }

                    {showError &&
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setShowError(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }>
                            Something went wrong, please try again
                        </Alert>}
                </Stack>
            </div>
        </div>

    </>);
};

export default EditPet;