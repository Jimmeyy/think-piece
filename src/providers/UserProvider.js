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
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapshot => {
                    this.setState({ user: { uid: snapshot.uid, ...snapshot.data() }, userLoaded: true })
                });
            }
            this.setState({ user: userAuth, userLoaded: true });
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
