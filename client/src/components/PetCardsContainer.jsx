import React from 'react';
import '../css/PetCardsContainer.css';
import PetCard from './PetCard';

const PetCardsContainer = ({ petObjectsArray }) => {
    return (
        <div className='pet-cards-container'>
            {(petObjectsArray) && petObjectsArray.map((pet) => (
                <PetCard petObject={pet} key={pet.petId} />
            ))}
        </div>
    );
}

export default PetCardsContainer;