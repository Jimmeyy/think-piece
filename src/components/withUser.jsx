import React from 'react';
import { UserContext } from '../providers/UserProvider';

const withUser = Component => {

    const WrappedComponent = props => (
        <UserContext.Consumer>
            {user => <Component user={user} {...props} />}
        </UserContext.Consumer>
    );

    return WrappedComponent;
}

export default withUser;