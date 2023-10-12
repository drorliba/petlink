import { useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Tab, Nav, Col, Row } from 'react-bootstrap';
import * as Yup from 'yup';

import { AuthContext } from '../context/AuthContext';
import MenuBar from '../components/MenuBar';
import SettingsDetailsForm from '../components/SettingsDetailsForm';
import SettingsPasswordForm from '../components/SettingsPasswordForm';
import '../css/ProfileSettingsPage.css';

const ProfileSettingsPage = () => {
    const { token, loggedinUser } = useContext(AuthContext);
    const [showDetailsSuccessAlert, setShowDetailsSuccessAlert] = useState(false);
    const [showDetailsError, setShowDetailsError] = useState(false);
    const [showPasswordSuccessAlert, setShowPasswordSuccessAlert] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);

    const detailsFormik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            bio: '',
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .max(15, 'Too long')
                .required("Can't remain empty"),
            last_name: Yup.string()
                .max(15, 'Too long')
                .required("Can't remain empty"),
            email: Yup.string()
                .email('Not valid')
                .max(30, 'Too long')
                .required("Can't remain empty"),
            phone_number: Yup.string()
                .max(15, 'Too long')
                .required("Can't remain empty"),
            bio: Yup.string()
                .max(140, 'Too long')
        }),
        onSubmit: async (values) => {
            try {
                const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/`, values, { headers: { Authorization: `Bearer ${token}` } });
                if (res.data.ok) {
                    setShowDetailsError(false);
                    setShowDetailsSuccessAlert(true);
                }
            } catch (err) {
                setShowDetailsError(true);
                console.log(err);
            }
        }
    });

    const passwordFormik = useFormik({
        initialValues: {
            password: '',
            reNewPass: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .max(15, 'Too long')
                .min(4, 'Too short')
                .required("Can't remain empty"),
            reNewPass: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Must match new password')
                .required('Required')
        }),
        onSubmit: async (values) => {
            try {
                const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/password`, values, { headers: { Authorization: `Bearer ${token}` } });
                if (res.data.ok) {
                    setShowPasswordError(false);
                    setShowPasswordSuccessAlert(true);
                }
            } catch (err) {
                setShowPasswordError(true);
                console.log(err);
            }
        }
    });

    useEffect(() => {
        if (!loggedinUser) return;
        detailsFormik.setValues({
            userId: loggedinUser.userId,
            first_name: loggedinUser.first_name,
            last_name: loggedinUser.last_name,
            email: loggedinUser.email,
            phone_number: loggedinUser.phone_number,
            bio: loggedinUser.bio || ''
        })
        passwordFormik.setFieldValue('userId', loggedinUser.userId)
    }, [loggedinUser]);

    const memoizedSettingsDetailsForm = useMemo(() => (
        <SettingsDetailsForm formik={detailsFormik} showSuccessAlert={showDetailsSuccessAlert} setShowSuccessAlert={setShowDetailsSuccessAlert} showError={showDetailsError} setShowError={setShowDetailsError} />
    ), [detailsFormik, showDetailsSuccessAlert, setShowDetailsSuccessAlert, showDetailsError, setShowDetailsError]);

    return loggedinUser && (<>
        <MenuBar />
        <div className="page-wrapp">
            <div className="content-wrap">
                <h1>Profile Settings</h1>
                <Tab.Container className="tab-container" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item className="left-tab">
                                    <Nav.Link eventKey="first">Update details</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Change password</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>

                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    {memoizedSettingsDetailsForm}
                                </Tab.Pane>

                                <Tab.Pane eventKey="second">
                                    <SettingsPasswordForm formik={passwordFormik} showSuccessAlert={showPasswordSuccessAlert} setShowSuccessAlert={setShowPasswordSuccessAlert} showError={showPasswordError} setShowError={setShowPasswordError} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div >
    </>);
};

export default ProfileSettingsPage;