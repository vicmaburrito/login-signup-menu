import { collection, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import db from '../../firebase/firebase-config';

const GET_USERS = 'GET_USERS';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAILED = 'GET_USERS_FAILED';

export const getUsers = () => (dispatch) => {
  dispatch({ type: GET_USERS });
  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const usersList = [];
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        usersList.push(userData);
      });
      const payload = usersList.map((user) => ({
        id: uuidv4(),
        email: user.email,
        name: user.name,
        password: user.password,
      }));
      dispatch({
        type: 'GET_USERS_SUCCESS',
        payload,
      });
    } catch (e) {
      dispatch({ type: GET_USERS_FAILED, payload: 'error' });
    }
  };
  fetchUsers();
};

const usersState = {
  users: [], loading: true, error: null,
};

export const usersReducer = (state = usersState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, loading: true };
    case GET_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case GET_USERS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
