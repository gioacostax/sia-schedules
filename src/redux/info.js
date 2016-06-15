/* Import Dependencies */
import { sia } from 'src/lib';

/* Actions types */
/* eslint no-unused-vars: 0 */

const FETCH_INFO = 'prometeo-app/info/FETCH_INFO';
const RECEIVE_INFO = 'prometeo-app/info/RECEIVE_INFO';

/* eslint no-unused-vars: 0 */

/* Initial State */
const initialState = {
  data: { plan: {}, url: {} }
};

/* Private Actions */
function receiveInfo(data) {
  return {
    type: 'RECEIVE_INFO',
    data
  };
}

function fetchInfo() {
  return (dispatch, getState) => {
    dispatch({ type: 'FETCH_INFO' });
    return fetch('https://prometeo-377a2.firebaseio.com/.json').then(res => {
      res.json().then(json => {
        if (!json.error) {
          dispatch(receiveInfo(json));
        }
      });
    });
  };
}

/* Public Actions */

export function getInfo() {
  return dispatch => {
    return dispatch(fetchInfo());
  };
}

/* Reducer */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_INFO': {
      return { ...state, data: action.data };
    }

    default: {
      return state;
    }
  }
}
