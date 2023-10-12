import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { PetContext } from '../context/PetContext';
import '../css/UserDetails.css'

const UserDetails = ({ userInfo, adoptedPets, fosteredPets }) => {
    // const [userInfo, setUserInfo] = useState({});
    // const [adoptedByThisUser, setAadoptedByThisUser] = useState([]);
    // const [fosteredByThisUser, setFosteredByThisUser] = useState([]);
    const [adoptedPetsObjects, setAdoptedPetsObjects] = useState([]);
    const [fosteredPetsObjects, setFosteredPetsObjects] = useState([]);
    const { getPet } = useContext(PetContext);
    const { token } = useContext(AuthContext);

    // const loadUser = async (userId) => {
    //     try {
    //         const currentUser = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
    //         setUserInfo(currentUser.data);
    //         await getUserPets();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // const getUserPets = async () => {
    //     try {
    //         const userPets = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/pets/user/${userInfo.userId}`, { headers: { Authorization: `Bearer ${token}` } });

    //         setAadoptedByThisUser(userPets.data.adopted);
    //         setFosteredByThisUser(userPets.data.fostered);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const fetchAdoptedPetsObjects = async () => {
        setAdoptedPetsObjects([]);
        try {
            const newArr = [];
            for (const id of adoptedPets) {
                const pet = await getPet(id);
                newArr.push(pet);
            }

            setAdoptedPetsObjects(newArr);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchFosteredPetsObjects = async () => {
        setFosteredPetsObjects([]);
        try {
            const newArr = [];
            for (const id of fosteredPets) {
                const pet = await getPet(id);
                newArr.push(pet);
            }

            setFosteredPetsObjects(newArr);
        } catch (err) {
            console.log(err);
        }
    }

    // useEffect(() => {
    //     loadUser(userId);
    // }, [userId]);

    // useEffect(() => {
    //     getUserPets();
    // }, [userInfo.userId]);

    useEffect(() => {
        fetchAdoptedPetsObjects();
    }, [adoptedPets]);

    useEffect(() => {
        fetchFosteredPetsObjects();
    }, [fosteredPets]);

    return (<div class="user-details">
        {(userInfo === null) && (
            <p> Select a user to see details</p>
        )}

        {userInfo !== null && (<>
            <h2>{userInfo.first_name} {userInfo.last_name}</h2>
            <p class="details-headers">Pets Adopted:</p>
            <div class="pets-links-list">{adoptedPetsObjects.map((pet, i) => {
                return <div key={i}><Link to={`/pet/${pet.petId}`}>{`${pet.name}`}</Link> <br /></div>
            })}</div>
            <p class="details-headers">Pets Fostered: </p>
            <div class="pets-links-list">{fosteredPetsObjects.map((pet, i) => {
                return <div key={i}><Link to={`/pet/${pet.petId}`}>{`${pet.name}`}</Link> <br /></div>
            })}</div>
            <p><span class="details-headers">Email:</span> {userInfo.email}</p>
            <p><span class="details-headers">Mobile number:</span> {userInfo.phone_number}</p>
            <p><span class="details-headers">Bio:</span> {userInfo.bio}</p>
        </>)
        }

    </div>);
};

export default UserDetails;