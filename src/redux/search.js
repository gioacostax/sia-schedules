/* Import Dependencies */
import { sia } from 'src/lib';

/* Actions types */
/* eslint no-unused-vars: 0 */

const SET_TYPE_FILTER = 'prometeo-app/search/SET_TYPE_FILTER';
const SET_HOUR_FILTER = 'prometeo-app/search/SET_HOUR_FILTER';

const FETCH_SUBJECTS = 'prometeo-app/search/FETCH_SUBJECTS';
const RECEIVE_SUBJECTS = 'prometeo-app/search/RECEIVE_SUBJECTS';

const FETCH_GROUPS = 'prometeo-app/search/FETCH_GROUPS';
const RECEIVE_GROUPS = 'prometeo-app/search/RECEIVE_GROUPS';

const TOGGLE_SEL_LIST = 'prometeo-app/search/TOGGLE_SEL_LIST';
const RESET_SEARCH = 'prometeo-app/search/RESET_SEARCH';

/* eslint no-unused-vars: 0 */

/* Initial State */
const initialState = {
  subjects: {
    data: null /* { list: [], count: 0, pags: 0, aPag: 1 }*/,
    search: ''
  },
  groups: [],
  filters: {
    type: '',
    hour: []
  },
  isListSelected: false
};

/* Private Actions */
function receiveSubjects(data) {
  return {
    type: 'RECEIVE_SUBJECTS',
    data
  };
}

function receiveGroups(code, group) {
  return {
    type: 'RECEIVE_GROUPS',
    code,
    group
  };
}

function fetchSubjects(search, noRes, noPag) {
  return (dispatch, getState) => {
    dispatch({ type: 'FETCH_SUBJECTS', search });
    const options = {
      filter: getState().search.filters.hour,
      type: getState().search.filters.type,
      level: getState().config.plan.level,
      plan: getState().config.plan.code,
      noRes,
      noPag
    };

    return sia.getSubjects(
      search,
      { host: `${getState().config.site.url}`, eco: 'https://sia-eco.herokuapp.com', id: 'prometeo' },
      options
    ).then(res => {
      dispatch(receiveSubjects({ ...res, aPag: noPag }));
    });
  };
}

function fetchGroups(code) {
  return (dispatch, getState) => {
    dispatch({ type: 'FETCH_GROUPS' });
    const options = {
      filter: getState().search.filters.hour,
      plan: getState().config.plan.code
    };

    return sia.getGroups(
      code,
      { host: `${getState().config.site.url}`, eco: 'https://sia-eco.herokuapp.com', id: 'prometeo' },
      options
    ).then(res => {
      dispatch(receiveGroups(code, res));
    });
  };
}

/* Public Actions */
export function setTypeFilter(typeFilter) {
  return {
    type: 'SET_TYPE_FILTER',
    typeFilter
  };
}

export function setHourFilter(hourFilter) {
  return {
    type: 'SET_HOUR_FILTER',
    hourFilter
  };
}

export function getSubjects(search, noRes, noPag) {
  return dispatch => {
    return dispatch(fetchSubjects(search, noRes, noPag));
  };
}

export function getGroups(code) {
  return dispatch => {
    return dispatch(fetchGroups(code));
  };
}

export function toggleSelList(value) {
  return {
    type: 'TOGGLE_SEL_LIST',
    value
  };
}

export function resetSearch() {
  return { type: 'RESET_SEARCH' };
}

/* Reducer */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TYPE_FILTER': {
      return {
        ...state,
        filters: {
          ...state.filters,
          type: action.typeFilter
        }
      };
    }

    case 'SET_HOUR_FILTER': {
      return {
        ...state,
        filters: {
          ...state.filters,
          hour: action.hourFilter
        }
      };
    }

    case 'FETCH_SUBJECTS': {
      return {
        ...state,
        subjects: {
          data: null,
          search: action.search
        }
      };
    }

    case 'RECEIVE_SUBJECTS': {
      return {
        ...state,
        subjects: {
          ...state.subjects,
          data: action.data
        }
      };
    }

    case 'RECEIVE_GROUPS': {
      return {
        ...state,
        groups: [
          ...state.groups,
          { code: action.code, list: action.group }
        ]
      };
    }

    case 'RESET_SEARCH': {
      return initialState;
    }

    case 'TOGGLE_SEL_LIST': {
      return { ...state, isListSelected: action.value };
    }

    default: {
      return state;
    }
  }
}
