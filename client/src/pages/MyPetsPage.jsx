import { useContext, useState, useEffect } from 'react';
import { Tab, Nav, Col, Row, Spinner } from 'react-bootstrap';

import '../css/MyPetsPage.css';
import MenuBar from '../components/MenuBar';
import PetCardsConatiner from '../components/PetCardsContainer';
import { AuthContext } from '../context/AuthContext';
import { PetContext } from '../context/PetContext';

const MyPetsPage = () => {
    const { adoptedByCurrentUser, fosteredByCurrentUser, savedByCurrentUser } = useContext(AuthContext);
    const { getPet } = useContext(PetContext);

    const [adoptedPetsArr, setAdoptedPetsArr] = useState([]);
    const [fosteredPetsArr, setFosteredPetsArr] = useState([]);
    const [savedPetsArr, setSavedPetsArr] = useState([]);
    const [loadingAdopted, setLoadingAdopted] = useState(false);
    const [loadingFostered, setLoadingFostered] = useState(false);
    const [loadingSaved, setLoadingSaved] = useState(false);

    const fetchAdoptedPetsObjects = async () => {
        try {
            setLoadingAdopted(true);

            const newArr = [];
            for (const id of adoptedByCurrentUser) {
                const pet = await getPet(id);
                newArr.push(pet);
            }

            return newArr;
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingAdopted(false);
        }
    }

    const fetchFosteredPetsObjects = async () => {
        try {
            setLoadingFostered(true);

            const newArr = [];
            for (const id of fosteredByCurrentUser) {
                const pet = await getPet(id);
                newArr.push(pet);
            }

            return newArr;
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingFostered(false);
        }
    }

    const fetchSavedPetsObjects = async () => {
        const newArr = [];

        try {
            setLoadingSaved(true);

            for (const id of savedByCurrentUser) {
                const pet = await getPet(id);
                newArr.push(pet);
            }

            return newArr;
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingSaved(false);
        }
    }

    useEffect(() => {
        (async () => {

            try {
                const adoptedPetsObjects = await fetchAdoptedPetsObjects();
                setAdoptedPetsArr(adoptedPetsObjects);

                const fosteredPetsObjects = await fetchFosteredPetsObjects();
                setFosteredPetsArr(fosteredPetsObjects);

                const savedPetsObjects = await fetchSavedPetsObjects();
                setSavedPetsArr(savedPetsObjects);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [adoptedByCurrentUser, fosteredByCurrentUser, savedByCurrentUser]);

    return (<>
        <MenuBar />

        <div className="page-wrapp">
            <div className="content-wrap">
                <h1>My Pets</h1>
                <Tab.Container className="tab-container" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item className="left-tab">
                                    <Nav.Link eventKey="first">Fostered and adopted</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Saved</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <h2>Adopted</h2>
                                    {loadingAdopted && <Spinner animation="border" variant="success" />}

                                    {(!loadingAdopted && adoptedPetsArr.length > 0) &&
                                        <PetCardsConatiner petObjectsArray={adoptedPetsArr} />}

                                    {(!loadingAdopted && adoptedPetsArr.length <= 0) &&
                                        <p>You don't have any adopted pets</p>
                                    }

                                    <h2>Fostered</h2>
                                    {loadingFostered && <Spinner animation="border" variant="success" />}

                                    {(!loadingFostered && fosteredPetsArr.length > 0) &&
                                        <PetCardsConatiner petObjectsArray={fosteredPetsArr} />}

                                    {(!loadingFostered && fosteredPetsArr.length <= 0) &&
                                        <p>You don't have any fostered pets</p>
                                    }
                                </Tab.Pane>

                                <Tab.Pane eventKey="second">
                                    {loadingFostered && <Spinner animation="border" variant="success" />}

                                    {(!loadingSaved && savedPetsArr.length > 0) &&
                                        <PetCardsConatiner petObjectsArray={savedPetsArr} />}

                                    {(!loadingSaved && savedPetsArr.length <= 0) &&
                                        <p>You didn't save any pets yet</p>
                                    }
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    </>);
};

export default MyPetsPage;