import React, { useState } from 'react';
import classNames from 'classnames';
import useAuth from '../../hooks/useAuth.js';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, invalidateField, validateForm } from '../../store/loginFormSlice';

function LoginForm() {
  const { values, validation, validated } = useSelector((state) => state.loginForm);
  const dispatch = useDispatch();
  const { profile, error, logIn } = useAuth();

  const handleChange = (e) => {
    dispatch(changeField({ name: e.target.name, value: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.login.length) {
      dispatch(invalidateField('login'));
      return;
    }
    if (!values.password.length) {
      dispatch(invalidateField('password'));
      return;
    }

    dispatch(validateForm());

    logIn(values.login, values.password);
  }

  if (profile) {
    return null;
  }

  return (
    <div className="col">
      <form
        className={classNames('login-form', { 'is-invalid': error && validated })}
        onSubmit={handleSubmit}
      >
        <div className="col me-2">
          <input
            className={classNames('form-control', { 'is-invalid': !validation.login })}
            type="text"
            name="login"
            onChange={handleChange}
            value={values.login}
            placeholder="Username"
          />
          <div className="invalid-feedback">Input login</div>
        </div>
        <div className="col me-2">
          <input
            className={classNames('form-control', { 'is-invalid': !validation.password })}
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            placeholder="Password"
          />
          <div className="invalid-feedback">Input password</div>
        </div>
        <button className="btn btn-outline-success" type="submit">Login</button>
      </form>
      <div className="invalid-feedback">{error}</div>
    </div>
  )
}

export default LoginForm;
