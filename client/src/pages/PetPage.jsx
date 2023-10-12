import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Stack, Button } from '@mui/material';
import { Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { PetContext } from '../context/PetContext';
import { AuthContext } from '../context/AuthContext';
import HeartButton from '../components/HeartButton';
import MenuBar from '../components/MenuBar';
import '../css/PetPage.css';

const PetPage = () => {
    const [petInfo, setPetInfo] = useState({});
    const { getPet } = useContext(PetContext);
    const { id } = useParams();

    const { token, loggedinUser } = useContext(AuthContext);

    const isAdoptedByCurrentUser = (petInfo?.adoptionStatus == 'adopted') && (petInfo?.ownerId == loggedinUser?.userId);
    const isFosteredByCurrentUser = (petInfo?.adoptionStatus == 'fostered') && (petInfo?.ownerId == loggedinUser?.userId);

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

    const handleAdoptOrFoster = async (adoptOrFoster) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/pets/${petInfo.petId}/adopt`, { userId: loggedinUser.userId, adoptOrFoster: adoptOrFoster }, { headers: { Authorization: `Bearer ${token}` } });

            setPetInfo({ ...petInfo, adoptionStatus: res.data.newStatus });
        } catch (err) {
            console.log(err);
        }
    }

    const handleReturn = async () => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/pets/${petInfo.petId}/return`, { headers: { Authorization: `Bearer ${token}` } });

            if (res.data.returned) {
                setPetInfo({ ...petInfo, adoptionStatus: 'available' });
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (<>
        <MenuBar />

        <div className="page-wrapp">
            <div className="content-wrap">

                {petInfo && <>
                    <h1>Details for <span className="pet-name">{petInfo.name} </span>
                        {(petInfo.adoptionStatus === 'fostered') && <Badge pill bg="secondary">fostered</Badge>}
                        {(petInfo.adoptionStatus === 'adopted') && <Badge pill bg="secondary">adopted</Badge>}</h1>
                    <Grid className="grid-container" spacing={1} container>
                        <Grid className="grid-column" item xs={12}>
                            <Stack direction="row" gap={1}>
                                {(petInfo.adoptionStatus === 'available' || isFosteredByCurrentUser) && (<>
                                    <Button color="success" variant="outlined" onClick={e => handleAdoptOrFoster('adopt')}>adopt</Button>

                                </>)}

                                {(petInfo.adoptionStatus === 'available') && (<>                         <Button color="success" variant="outlined" onClick={e => handleAdoptOrFoster('foster')}>foster</Button></>)}

                                {(isAdoptedByCurrentUser || isFosteredByCurrentUser) &&
                                    <Button color="success" variant="outlined" onClick={e => handleReturn()} >return pet</Button>}

                                <HeartButton petId={id} />
                            </Stack>
                        </Grid>
                        <Grid className="grid-column" item xs={5}>
                            <Stack>
                                <p><span className="field-name">Type: </span>{petInfo.type}</p>
                                <p><span className="field-name">Adoption Status: </span>{petInfo.adoptionStatus}</p>
                                <p><span className="field-name">Height: </span>{petInfo.height}cm</p>
                                <p><span className="field-name">Weight: </span>{petInfo.weight}kg</p>
                                <p><span className="field-name">Color: </span>{petInfo.color}</p>
                                <p><span className="field-name">Bio: </span>{petInfo.bio}</p>
                                <p><span className="field-name">Hypoallergenic: </span>{petInfo.hypoallergenic ? ('yes') : ('no')}</p>
                                <p><span className="field-name">Dietary restrictions: </span>{petInfo.dietary}</p>
                                <p><span className="field-name">Breed: </span>{petInfo.breed}</p>
                            </Stack>
                        </Grid>
                        <Grid className="grid-column" item xs={7}>
                            <img className="pet-picture" src={petInfo.picture} alt={petInfo.name} />
                        </Grid>
                    </Grid>
                </>}
            </div>
        </div >
    </>);
};

export default PetPage;