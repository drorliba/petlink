import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loggedinUser, setLoggedinUser] = useState(null);
    const [adoptedByCurrentUser, setAadoptedByCurrentUser] = useState([]);
    const [fosteredByCurrentUser, setFosteredByCurrentUser] = useState([]);
    const [savedByCurrentUser, setSavedByCurrentUser] = useState([]);

    const getLoggedinUser = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/loggedInUser`, { headers: { Authorization: `Bearer ${token}` } });
            setLoggedinUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUserPets = async () => {
        try {
            const userPets = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/pets/user/${loggedinUser.userId}`, { headers: { Authorization: `Bearer ${token}` } });

            setAadoptedByCurrentUser(userPets.data.adopted);
            setFosteredByCurrentUser(userPets.data.fostered);
            setSavedByCurrentUser(userPets.data.saved);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (token) {
            getLoggedinUser();
        }
    }, [token]);

    useEffect(() => {
        if (loggedinUser) {
            fetchUserPets();
        }
    }, [loggedinUser]);


    const logout = () => {
        setToken(null);
        setLoggedinUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ setToken, token, getLoggedinUser, loggedinUser, adoptedByCurrentUser, fosteredByCurrentUser, savedByCurrentUser, setSavedByCurrentUser, logout, fetchUserPets }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthContextProvider;