import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import authStorage from './storage';

export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const logOut = () => {
        setUser('');
        authStorage.removeToken();
    }

    const login = (authToken) => {
        setUser(authToken)
        authStorage.storeToken(authToken)
    }
    
    const loginAuth = (authToken) => {
        authStorage.storeAuth(authToken)
    }

    return { login, logOut, user, loginAuth };
}