/* Actions types */
/* eslint no-unused-vars: 0 */

const FETCH_INFO = 'prometeo-app/info/FETCH_INFO';
const RECEIVE_INFO = 'prometeo-app/info/RECEIVE_INFO';

/* eslint no-unused-vars: 0 */

/* Initial State */
const initialState = {
  data: {
    plan: {},
    url: {
      ama: 'https://siaama.unal.edu.co',
      bog: 'https://siabog.unal.edu.co',
      car: 'https://siacar.unal.edu.co',
      getGroups: 'https://us-central1-sia-eco.cloudfunctions.net/getGroups',
      getSubjects: 'https://us-central1-sia-eco.cloudfunctions.net/getSubjects',
      man: 'https://siaman.unal.edu.co',
      med: 'https://siamed.unal.edu.co',
      ori: 'https://siaori.unal.edu.co',
      pal: 'https://siapal.unal.edu.co',
      tum: 'https://siatum.unal.edu.co',
    }
  }
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
    return fetch('https://sia-eco.firebaseio.com/sia/.json').then(res => {
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
