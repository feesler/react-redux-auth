import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import UserProfile from './UserProfile.jsx';

function Header() {
    return (
        <div className="header">
            <div className="header__logo me-4">Neto Social</div>
            <Routes>
                <Route path="/" Component={LoginForm} />
                <Route path="/*" Component={UserProfile} />
            </Routes>
        </div>
    );
}

export default Header;
