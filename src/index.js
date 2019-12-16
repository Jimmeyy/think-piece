import React from 'react';
import { render } from 'react-dom';
import Application from './components/Application';
import './index.scss';
import PostsProvider from './providers/PostsProvider';
import UserProvider from './providers/UserProvider';


render(
    <UserProvider>
        <PostsProvider>
            <Application />
        </PostsProvider>
    </UserProvider>,
    document.getElementById('root')
);
