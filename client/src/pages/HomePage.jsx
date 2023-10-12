import { useContext, useEffect } from 'react';
import { Link } from '@mui/material';
import '../css/HomePage.css';
import { PetContext } from '../context/PetContext';
import MenuBar from '../components/MenuBar';
import PetCardsContainer from '../components/PetCardsContainer';

const HomePage = () => {
    const { petsList, fetchPets } = useContext(PetContext);

    useEffect(() => {
        fetchPets();
    }, []);

    return (
        <>
            <MenuBar />
            <div className="page-wrapp">
                <div className="content-wrap">
                    <p>Ready to meet your next best friend?<br />You arrived to the right place &#127881;</p>
                    {petsList && (<PetCardsContainer petObjectsArray={petsList.slice(0, 4)} />)}
                    <Link underline="hover" href="search">See more pets...</Link>
                </div>
            </div>
        </>
    );
};

export default HomePage;