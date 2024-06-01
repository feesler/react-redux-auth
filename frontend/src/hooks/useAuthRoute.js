import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { readProfile, logOut } from '../store/authSlice.js';

export default function useAuthRoute() {
  const { token, profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      if (token) {
        navigate('/news');
      }
      return;
    } else {
      if (!token) {
        dispatch(logOut());
        navigate('/');
        return;
      }
    }

    if (!profile) {
      dispatch(readProfile());
    }
  }, [token, profile, dispatch, location.pathname]);
}
