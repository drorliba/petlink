import React, { useState, useContext, useRef } from 'react';
import { TextField, Stack, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputAdornment, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MenuBar from '../components/MenuBar';
import { PetContext } from '../context/PetContext';

const AddPetPage = () => {

    const { addPet } = useContext(PetContext);

    const [formFieldsHolder, setFormFieldsHolder] = useState({
        type: 'dog',
        name: '',
        breed: '',
        color: '',
        weight: '',
        height: '',
        hypoallergenic: '',
        dietaryRestrictions: '',
        bio: ''
    });
    const [petImage, setPetImage] = useState('');
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleFormFields = (e) => {
        const { name, value } = e.target;
        setFormFieldsHolder({ ...formFieldsHolder, [name]: value });
    };

    const handleSubmit = (e) => {
        const newPet = new FormData();

        newPet.append('petImage', petImage);
        for (let key in formFieldsHolder) {
            newPet.append(key, formFieldsHolder[key]);
        }

        console.log(formFieldsHolder);
        addPet(newPet);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        setFormFieldsHolder({
            type: 'dog',
            name: '',
            breed: '',
            color: '',
            weight: '',
            height: '',
            hypoallergenic: '',
            dietaryRestrictions: '',
            bio: ''
        });

        navigate('../search');
    }

    return (<>
        <MenuBar />

        <div className="page-wrapp">
            <div className="content-wrap">
                <h1>Add a new pet</h1>
                <Stack className="form-stack" spacing={2}>
                    <FormControl>
                        <FormLabel id="pet-kind">Kind</FormLabel>
                        <RadioGroup
                            name="type"
                            value={formFieldsHolder.type}
                            onChange={handleFormFields}
                        >
                            <FormControlLabel value="dog" control={<Radio />} label="&#128054; Dog" />
                            <FormControlLabel value="cat" control={<Radio />} label="&#128049; Cat" />
                        </RadioGroup>
                    </FormControl>

                    <TextField name="name" label="Name" variant="outlined" required value={formFieldsHolder.name} onChange={handleFormFields} />

                    <TextField name="breed" label="Breed" variant="outlined" helperText="Poodle/Siamese etc." value={formFieldsHolder.breed} onChange={handleFormFields} />

                    <TextField name="color" label="Color" variant="outlined" value={formFieldsHolder.color} onChange={handleFormFields} />

                    <TextField
                        name="weight"
                        label="Weight"
                        id="weight"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>
                        }}
                        value={formFieldsHolder.weight}
                        onChange={handleFormFields}
                    />

                    <TextField
                        name="height"
                        label="height"
                        id="height"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>
                        }}
                        value={formFieldsHolder.height}
                        onChange={handleFormFields}
                    />

                    <FormControl>
                        <FormLabel>Picture</FormLabel>
                        <TextField
                            type="file"
                            onChange={e => { setPetImage(e.target.files[0]) }}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            inputRef={fileInputRef}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel id="hypoallergenic">Hypoallergenic</FormLabel>
                        <RadioGroup
                            name="hypoallergenic"
                            defaultValue="no"
                            value={formFieldsHolder.hypoallergenic}
                            onChange={handleFormFields}
                        >
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                            <FormControlLabel value="1" control={<Radio />} label="Yes" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        name="dietaryRestrictions"
                        label="Dietary restrictions"
                        multiline
                        rows={2}
                        value={formFieldsHolder.dietaryRestrictions}
                        onChange={handleFormFields}
                    />

                    <TextField
                        name="bio"
                        label="Short bio"
                        multiline
                        rows={3}
                        value={formFieldsHolder.bio}
                        onChange={handleFormFields}
                    />

                    <Button variant="contained" color="success" onClick={handleSubmit}>Add pet</Button>
                    {showErrorAlert && <Alert severity="error">Something went wrong, Please try again</Alert>}
                </Stack>
            </div>
        </div >
    </>);
};

export default AddPetPage;