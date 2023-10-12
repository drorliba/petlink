import { TextField, Button, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Stack from 'react-bootstrap/Stack';

const SettingsDetailsForm = ({ formik, showSuccessAlert, setShowSuccessAlert, showError, setShowError }) => {

    return (
        <Stack gap={3}>
            <p>Edit your personal details:</p>
            <TextField name="first_name" label="First name" variant="outlined" color="success" value={formik.values.first_name} onChange={formik.handleChange}
                error={formik.touched.first_name && !!formik.errors.first_name}
                helperText={(formik.touched.first_name && !!formik.errors.first_name) && formik.errors.first_name}
            />

            <TextField name="last_name" label="Last name" variant="outlined" color="success" value={formik.values.last_name} onChange={formik.handleChange}
                error={formik.touched.last_name && !!formik.errors.last_name}
                helperText={(formik.touched.last_name && !!formik.errors.last_name) && formik.errors.last_name} />

            <TextField name="email" label="Email" variant="outlined" color="success" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && !!formik.errors.email}
                helperText={(formik.touched.email && !!formik.errors.email) && formik.errors.email} />

            <TextField name="phone_number" label="Phone" variant="outlined" color="success" value={formik.values.phone_number} onChange={formik.handleChange} error={formik.touched.phone_number && !!formik.errors.phone_number}
                helperText={(formik.touched.phone_number && !!formik.errors.phone_number) && formik.errors.phone_number} />
            <TextField
                name="bio"
                label="Short bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                multiline
                rows={3}
                color="success"
                error={formik.touched.bio && !!formik.errors.bio}
                helperText={(formik.touched.bio && !!formik.errors.bio) && formik.errors.bio}
            />
            <Button variant="contained" color="success" onClick={formik.handleSubmit}>Save changes</Button>
            {showSuccessAlert &&
                <Alert
                    severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setShowSuccessAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    Personal information updated successfuly
                </Alert>
            }

            {showError &&
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setShowError(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    Something went wrong, please try again
                </Alert>}
        </Stack>
    );
};

export default SettingsDetailsForm;