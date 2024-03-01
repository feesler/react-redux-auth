import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Banner from './Banner.jsx';
import NewsList from './NewsList.jsx';
import Page404 from './Page404.jsx';

function Content() {
    return (
        <div className="content">
            <Routes>
                <Route path="/" Component={Banner} />
                <Route path="/news" Component={NewsList} />
                <Route path="/*" Component={Page404} />
            </Routes>
        </div>
    );
}

export default Content;
