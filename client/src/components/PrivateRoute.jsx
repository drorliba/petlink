import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, onlyAdmin }) => {
    const { token, loggedinUser } = useContext(AuthContext);

    if (onlyAdmin && (loggedinUser?.is_admin != 1)) {
        return <Navigate to="/homepage" />
    }

    return (<>
        {token ? children : <Navigate to="/homepage" />}
    </>);
}
    ;
export default PrivateRoute;