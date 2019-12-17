import React, { Component } from 'react';
import { firestore, auth } from '../firebase';

class UserProfilePage extends Component {

    state = {
        displayName: ''
    }
    imageInput = null;

    get uid() {
        return auth.currentUser.uid;
    }

    get userRef() {
        return firestore.collection('users').doc(this.uid);
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { displayName } = this.state;
        if (displayName) {
            this.userRef.update({ displayName });
        }
    }

    render() {
        const { displayName } = this.state;

        return (
            <section className="UserProfile">
                <form onSubmit={this.handleSubmit} className="UpdateUser">
                    <input
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Display Name"
                        onChange={this.handleChange}
                    />
                    <input type="file" ref={ref => (this.imageInput = ref)} />
                    <input className="update" type="submit" />
                </form>
            </section>
        );
    }
}

export default UserProfilePage;