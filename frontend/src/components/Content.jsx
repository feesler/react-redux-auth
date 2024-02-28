import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Banner from './Banner.jsx';
import NewsList from './NewsList.jsx';
import Page404 from './Page404.jsx';

function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" exact component={Banner} />
        <Route path="/news" exact component={NewsList} />
        <Route component={Page404} />
      </Routes>
    </div>
  )
}

export default Content;
