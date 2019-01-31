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
    data: { list: [], count: 0, pags: 0, aPag: 1 },
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
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: `${getState().config.site.url}/buscador/JSON-RPC`,
        query: {
          keyword: search,
          filter: getState().search.filters.hour,
          plan: getState().config.plan.code,
          level: getState().config.plan.level,
          type: getState().search.filters.type,
          noPag,
          noRes
        }
      })
    };
    return fetch(
      getState().info.data.url.getSubjects,
      config
    ).then(res => res.json().then((json) => {
      dispatch(receiveSubjects({ ...json.result, aPag: noPag }));
    }));
  };
}


function fetchGroups(code) {
  return (dispatch, getState) => {
    dispatch({ type: 'FETCH_GROUPS' });
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: `${getState().config.site.url}/buscador/JSON-RPC`,
        query: {
          code,
          filter: getState().search.filters.hour,
          plan: getState().config.plan.code
        }
      })
    };

    return fetch(
      getState().info.data.url.getGroups,
      config
    ).then(res => res.json().then((json) => {
      dispatch(receiveGroups(code, json.result.list));
    }));
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
        groups: [],
        filters: {
          ...state.filters,
          type: action.typeFilter
        }
      };
    }

    case 'SET_HOUR_FILTER': {
      return {
        ...state,
        groups: [],
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
          data: { list: [], count: 0, pags: 0, aPag: 1 },
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
