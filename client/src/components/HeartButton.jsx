import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { AuthContext } from '../context/AuthContext';

const HeartButton = ({ petId }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const { token, loggedinUser, savedByCurrentUser, setSavedByCurrentUser } = useContext(AuthContext);

    useEffect(() => {
        if (savedByCurrentUser.includes(petId)) {
            setIsSaved(true);
        }
    }, [savedByCurrentUser]);

    const addSave = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/pets/${petId}/save`, { userId: loggedinUser.userId }, { headers: { Authorization: `Bearer ${token}` } });
            setSavedByCurrentUser([...savedByCurrentUser, petId]);
        } catch (err) {
            console.log(err);
        }
    }

    const removeSave = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/pets/${petId}/save?userId=${loggedinUser.userId}`, { headers: { Authorization: `Bearer ${token}` } });

            const newSavedArr = savedByCurrentUser.filter((id) => {
                return id !== petId;
            });
            setSavedByCurrentUser(newSavedArr);
        } catch (err) {
            console.log(err);
        }
    }

    const handleClick = (e) => {
        if (!loggedinUser) {
            setShowModal(true);
            return;
        }
        if (isSaved) {
            removeSave();
            setIsSaved(false);
            return;
        }
        addSave();
        setIsSaved(true);
    }

    return (<>
        <div className="heart-button"
            onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg"
                fill={isSaved ? ("#dc3545") : ("none")}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        </div>
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Body>Only logged in users can save pets.</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleCloseModal}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default HeartButton;