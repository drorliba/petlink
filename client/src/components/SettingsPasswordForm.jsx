import { TextField, Button, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Stack from 'react-bootstrap/Stack';
import { useEffect } from 'react';

const SettingsPasswordForm = ({ formik, showSuccessAlert, setShowSuccessAlert, showError, setShowError }) => {

    return (
        <Stack gap={3}>
            <p>Change your password:</p>

            <TextField type="password" name="password" label="New password" variant="outlined" color="success"
                value={formik.values.newPass}
                onChange={formik.handleChange}
                error={formik.touched.password && !!formik.errors.password}
                helperText={(formik.touched.password && !!formik.errors.password) && formik.errors.password}
            />

            <TextField type="password" name="reNewPass" label="Confirm new password" variant="outlined" color="success"
                value={formik.values.reNewPass}
                onChange={formik.handleChange}
                error={formik.touched.reNewPass && !!formik.errors.reNewPass}
                helperText={(formik.touched.reNewPass && !!formik.errors.reNewPass) && formik.errors.reNewPass}
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
                    Password changed successfuly
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

export default SettingsPasswordForm;