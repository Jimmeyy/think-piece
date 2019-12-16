import React, { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import SignInAndSignUp from './SignInAndSignUp';
import CurrentUser from './CurrentUser';

const UserDashboard = () => {
    const { user } = useContext(UserContext);
    const { userLoaded } = useContext(UserContext);

    const userInformation = user ? <CurrentUser {...user} /> : <SignInAndSignUp />

    return (
        <div>
            {userLoaded && userInformation}
        </div>
    )
}

export default UserDashboard;