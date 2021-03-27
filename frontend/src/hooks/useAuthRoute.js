import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { readProfile, logOut } from '../store/authSlice';

export default function useAuthRoute() {
  const { token, profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  let history = useHistory();

  useEffect(() => {
    if (location.pathname === '/') {
      if (token) {
        history.replace('/news');
      }
      return;
    } else {
      if (!token) {
        dispatch(logOut());
        history.replace('/');
        return;
      }
    }

    if (!profile) {
      dispatch(readProfile());
    }
  }, [token, profile, dispatch, location.pathname]);
}
