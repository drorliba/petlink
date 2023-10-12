import { useState, createContext, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';
const PetContext = createContext();

const PetContextProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [petsList, setPetsList] = useState([]);

    const fetchPets = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/pets`);
            setPetsList(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getPet = async (petId) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/pets/${petId}`);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const addPet = async (newPet) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/pets`, newPet, { headers: { Authorization: `Bearer ${token}` } });

            const newPetsList = [...petsList, res.data];
            setPetsList(newPetsList);
        } catch (err) {
            console.log(err);
        }
    };

    const deletePet = async (petId) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/pets/${petId}`/*, { header: { Authorization: `Bearer ${token}` } }*/);
            if (res.data.ok) {
                const deletedArray = petsList.filter((pet) => pet.id != petId);
                setPetsList(deletedArray);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const editPet = async (editedPet) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/pets/`, editedPet, { headers: { Authorization: `Bearer ${token}` } });
            return res.data.ok;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <PetContext.Provider value={{ petsList, editPet, setPetsList, addPet, deletePet, fetchPets, getPet }}>
            {children}
        </PetContext.Provider>
    );

};

export { PetContext };
export default PetContextProvider;