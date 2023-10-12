import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Tabs, Tab, Table, Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import MenuBar from '../components/MenuBar';
import UserDetails from '../components/UserDetails';
import '../css/DashboardPage.css';

const DashboardPage = () => {
    const { token } = useContext(AuthContext);

    const [adminsList, setAdminsList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [petList, setPetList] = useState([]);

    const [userToDisplay, setUserToDisplay] = useState(null);
    const [userAdoptedPetsList, setUserAdoptedPetsList] = useState([]);
    const [userFosteredPetsList, setUserFosteredPetsList] = useState([]);

    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const users = [];
            const admins = [];
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`, { headers: { Authorization: `Bearer ${token}` } });

            for (const user of res.data) {
                if (user.is_admin) {
                    admins.push(user);
                } else {
                    users.push(user);
                }

            }

            setAdminsList(admins);
            setUsersList(users);

        } catch (err) {
            console.log(err);
        }
    };

    const fetchPets = async () => {
        try {
            const pets = [];
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/pets`);

            for (const pet of res.data) {
                pets.push(pet);
            }

            pets.reverse();
            setPetList(pets);

        } catch (err) {
            console.log(err);
        }
    };

    const getUserPets = async () => {
        try {
            const userPets = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/pets/user/${userToDisplay.userId}`, { headers: { Authorization: `Bearer ${token}` } });

            setUserAdoptedPetsList(userPets.data.adopted);
            setUserFosteredPetsList(userPets.data.fostered);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUsers();
        fetchPets();
    }, []);

    useEffect(() => {
        getUserPets();
    }, [userToDisplay]);

    return (<div className="dashboard-page">
        <MenuBar />

        <div className="page-wrapp">
            <div className="content-wrap">
                <h1>Dashboard</h1>
                <Tabs defaultActiveKey="users" className="mb-3">
                    <Tab eventKey="users" title="Users">
                        <Container>
                            <Row>
                                <Col>
                                    <h2>Admins</h2>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {adminsList.map(admin => {
                                                const isHighlighted = admin.userId === userToDisplay;
                                                return (
                                                    <tr
                                                        key={admin.userId}
                                                        onClick={() => setUserToDisplay(admin)}
                                                        className={isHighlighted ? 'highlighted-row' : ''}
                                                    >
                                                        <td>{admin.userId}</td>
                                                        <td>{admin.first_name}</td>
                                                        <td>{admin.last_name}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <h2>Users</h2>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usersList.map(user => {
                                                const isHighlighted = user.userId === userToDisplay;
                                                return (
                                                    <tr
                                                        key={user.userId}
                                                        onClick={() => setUserToDisplay(user)}
                                                        className={isHighlighted ? 'highlighted-row' : ''}
                                                    >
                                                        <td>{user.userId}</td>
                                                        <td>{user.first_name}</td>
                                                        <td>{user.last_name}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </Col>

                                <Col>
                                    <UserDetails userInfo={userToDisplay} adoptedPets={userAdoptedPetsList} fosteredPets={userFosteredPetsList} />
                                </Col>
                            </Row>
                        </Container>
                    </Tab>

                    <Tab eventKey="pets" title="Pets">

                        <h2>All the pets</h2>
                        <Table bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {petList.map(pet => {
                                    return (
                                        <tr key={pet.petId}>
                                            <td>{pet.petId}</td>
                                            <td><Link to={'/pet/' + pet.petId}>{pet.name}</Link></td>
                                            <td>{pet.type}</td>
                                            <td>{pet.adoptionStatus}</td>
                                            <td>
                                                <Button className="pet-button" variant="outline-success" size="sm" onClick={e => navigate('/editpet/' + pet.petId)}>Edit</Button>
                                            </td>
                                        </tr>);
                                })}
                            </tbody>
                        </Table>

                    </Tab>
                </Tabs>
            </div>
        </div>

    </div>);
};

export default DashboardPage;