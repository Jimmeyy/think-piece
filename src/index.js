import React from 'react';
import { render } from 'react-dom';
import Application from './components/Application';
import './index.scss';
import PostsProvider from './providers/PostsProvider';


render(
    <PostsProvider>
        <Application />
    </PostsProvider>,
    document.getElementById('root')
);
