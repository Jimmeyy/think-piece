import React, { Component, createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
        user: null,
        userLoaded: false
    }

    unsubscribe = null;

    componentDidMount = async () => {
        this.unsubscribe = auth.onAuthStateChanged(async userAuth => {
            const user = await createUserProfileDocument(userAuth);
            this.setState({ user, userLoaded: true });
        });
    }

    componentWillUnmount = () => {
        this.unsubscribe();
    }

    render() {
        const { user, userLoaded } = this.state;
        const { children } = this.props;

        return (
            <UserContext.Provider value={{ user, userLoaded }}>
                {children}
            </UserContext.Provider>
        )
    }
}

export default UserProvider;
